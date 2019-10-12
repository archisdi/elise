import { HttpError } from 'tymon';

import JWT, { validatePassword } from '../libs/jwt';
import Validator from '../middlewares/request_validator';
import BaseController from './base/base_controller';
import { IContext, IData, IHandlerOutput } from '../typings/common';
import { LoginHandlerInput } from 'src/typings/methods/auth';
import UserRepository from '../repositories/user_repo';

export default class AuthController extends BaseController {
    public async login(data: IData, context: IContext): Promise<IHandlerOutput> {
        try {
            const {
                body: { username, password }
            }: LoginHandlerInput = data;

            const userRepo = new UserRepository();
            const user = await userRepo.findOne({ username });

            if (!user) {
                throw HttpError.NotAuthorized(null, 'CREDENTIAL_NOT_MATCH');
            }

            if (!validatePassword(password, user.password)) {
                throw HttpError.NotAuthorized(null, 'CREDENTIAL_NOT_MATCH');
            }

            const token = JWT.generateToken({ user_id: username });

            return {
                message: 'authentication success',
                data: {
                    token,
                    expires_in: Number(process.env.JWT_LIFETIME)
                }
            };
        } catch (err) {
            if (err.status) throw err;
            throw HttpError.InternalServerError(err.message);
        }
    }

    public setRoutes(): void {
        this.addRoute('post', '/login', this.login, Validator('login'));
    }
}
