import { Context } from 'src/typings/common';
import { Controller as BaseController, RequestData } from 'zuu';
import API_ROUTE from '../entity/constant/api_route';
import AuthMiddleware from '../middleware/jwt_auth';
import UserService from '../service/interfaces/user_service';

export default class ProfileController extends BaseController {
    public constructor(
        private userService: UserService
    ) {
        super({ path: API_ROUTE.PROFILE, middleware: AuthMiddleware() });
    }

    public async getProfile(data: RequestData, context: Context): Promise<any> {
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
