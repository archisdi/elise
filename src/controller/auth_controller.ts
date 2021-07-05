import { LoginReponse, LoginRequest } from 'src/typings/endpoints';
import { Controller as BaseController } from '@archisdi/zuu';
import { SCHEME } from '../utility/validator';
import UserService from '../service/interfaces/user_service';
import { Context } from '../typings/common';
import API_ROUTE from '../entity/constant/api_route';

export default class AuthController extends BaseController {

    public constructor(
        private userService: UserService
    ) {
        super({ path: API_ROUTE.AUTH });
    }

    public async login(data: LoginRequest, context: Context): Promise<LoginReponse> {
        const {
            body: { username, password }
        } = data;

        const { lifetime, refresh_token, token } = await this.userService.signUser(username, password);

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
