import { HttpError } from 'tymon';

import Validator from '../middlewares/request_validator';
import BaseController from './base/base_controller';
import { IContext, IHandlerOutput } from '../typings/common';
import { LoginHandlerInput, LoginHandlerOutput } from 'src/typings/methods/auth';
import RepoService from '../utils/wrapper/repository';
import { UserModel } from '../models/user_model';

export default class AuthController extends BaseController {
    public async login(data: LoginHandlerInput, context: IContext): Promise<IHandlerOutput<LoginHandlerOutput>> {
        const {
            body: { username, password }
        } = data;

        const userRepo = RepoService.getSql<UserModel>(UserModel);
        const user = await userRepo.findOne({ username });

        if (!user) {
            throw HttpError.NotAuthorized(null, 'CREDENTIAL_NOT_MATCH');
        }

        const token = user.signJwtToken(password);

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
