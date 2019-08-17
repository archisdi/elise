import { HttpError } from 'tymon';

import JWT from '../libs/jwt';
import Validator from '../middlewares/request_validator';
import { IContext, IData, IHandlerOutput } from '../typings/common';
import BaseController from './base/base_controller';
import { LoginHandlerInput } from 'src/typings/methods/auth';

export default class AuthController extends BaseController {
    public async login(data: IData, context: IContext): Promise<IHandlerOutput> {
        try {
            const {
                body: { username, password }
            }: LoginHandlerInput = data;

            const token: string = await JWT.generateToken({ user_id: username });

            return {
                message: 'authentication success',
                data: {
                    token,
                    expires_in: Number(process.env.JWT_LIFETIME)
                }
            };
        } catch (err) {
            if (err.status) {
                throw err;
            }
            throw HttpError.InternalServerError(err.message);
        }
    }

    public setRoutes(): void {
        this.addRoute('post', '/login', this.login, Validator('login'));
    }
}
