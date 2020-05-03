import { HttpError } from 'tymon';

import JWT, { validatePassword } from '../libs/jwt';
import Validator from '../middlewares/request_validator';
import BaseController from './base/base_controller';
import { IContext, IData, IHandlerOutput } from '../typings/common';
import { LoginHandlerInput } from 'src/typings/methods/auth';
import RepoService from 'src/utils/wrapper/repository';
import { UserModel } from 'src/models/user_model';

export default class AuthController extends BaseController {
    public async login(data: IData, context: IContext): Promise<IHandlerOutput> {
        const {
            body: { username, password }
        }: LoginHandlerInput = data;

        const userRepo = RepoService.getSql<UserModel>(UserModel);
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
        // Wrap in try/catch block if transaction is needed
    }

    public setRoutes(): void {
        this.addRoute('post', '/login', this.login, Validator('login'));
    }
}
