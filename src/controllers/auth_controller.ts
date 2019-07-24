import { HttpError } from 'tymon';

import JWT from '../libs/jwt';
import Validator from '../middlewares/request_validator';
import { IContext, IData, IBaseController } from '../typings/common';
import BaseController from './base/base_controller';

export default class AuthController extends BaseController {
    public async login(data: IData, context: IContext) {
        try {
            const { body: { username, password } } = data;

            const token: string = await JWT.generateToken({ user_id: username });

            return {
                message: 'authentication success',
                data: {
                    token,
                    expires_in: Number(process.env.JWT_LIFETIME)
                }
            };
        } catch (err) {
            if (err.status) { throw err; }
            throw HttpError.InternalServerError(err.message);
        }
    }

    public setRoutes() {
        this.addRoute('post', '/login', [Validator('login')], this.login);
    }
}
