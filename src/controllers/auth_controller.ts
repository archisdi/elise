import { LoginReponse, LoginRequest } from 'src/typings/endpoints';
import { HttpError } from 'tymon';
import UserLoggedInEvent from '../events/user_logged_in_event';
import { UserModel } from '../models/user_model';
import { IContext } from '../typings/common';
import { SCHEMA } from '../utils/validator';
import BaseController from './base/base_controller';

export default class AuthController extends BaseController {
    public constructor() {
        super({ path: '/auth' });
    }

    public async login(data: LoginRequest, context: IContext): Promise<LoginReponse> {
        const {
            body: { username, password }
        } = data;

        const user = await UserModel.repo.findOne({ username });
        if (!user) {
            throw HttpError.UnauthorizedError('credential not match', 'CREDENTIAL_NOT_MATCH');
        }

        /** sign token if credential correct */
        const { token, lifetime } = user.signJwtToken(password);

        /** save and cache */
        await user.save({ cache: true });

        /** dispatch event */
        await UserLoggedInEvent.dispatch({ user: user.toJson() });

        return {
            token: token,
            refresh_token: user.refresh_token,
            expires_in: lifetime
        };
        // Wrap in try/catch block if transaction is needed
    }

    public setRoutes(): void {
        this.addRoute<LoginReponse>('post', '/login', this.login, { validate: SCHEMA.LOGIN });
    }
}
