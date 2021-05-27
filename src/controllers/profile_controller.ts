import { IContext } from 'src/typings/common';
import AuthMiddleware from '../middlewares/jwt_auth';
import { Controller as BaseController, IData } from 'zuu';
import UserService from '../services/interfaces/user_service';

export default class ProfileController extends BaseController {
    public constructor(
        private userService: UserService
    ) {
        super({ path: '/profile', middleware: AuthMiddleware() });
    }

    public async getProfile(data: IData, context: IContext): Promise<any> {
        const user = await this.userService.getUser(context.user_id);
        return user.toJson({ removeHidden: true });
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getProfile.bind(this), { cache: true });

        /** nested controllers */
        // this.addChildController(Controller);
    }
}
