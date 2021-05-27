import { LoginReponse, LoginRequest } from 'src/typings/endpoints';
import { Controller as BaseController } from 'zuu';
import { SCHEME } from '../libs/validator';
import UserService from '../services/interfaces/user_service';
import { IContext } from '../typings/common';

export default class AuthController extends BaseController {

    public constructor(
        private userService: UserService
    ) {
        super({ path: '/auth' });
    }

    public async login(data: LoginRequest, context: IContext): Promise<LoginReponse> {
        const {
            body: { username, password }
        } = data;

        const { lifetime, refresh_token, token} = await this.userService.signUser(username, password);

        return {
            token,
            refresh_token,
            expires_in: lifetime,
        };
    }

    public setRoutes(): void {
        this.addRoute<LoginReponse>('post', '/login', this.login.bind(this), { validate: SCHEME.LOGIN });
    }
}
