import { IContext, IData } from 'src/typings/common';
import AuthMiddleware from '../middlewares/jwt_auth';
import { UserModel } from '../models/user_model';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super({ path: '/profile', middleware: AuthMiddleware() });
    }

    public async getProfile(data: IData, context: IContext): Promise<any> {
        /** simulate caching */
        let user = await UserModel.findFromCache(context.user_id);
        if (!user) {
            user = await UserModel.repo.findOneOrFail({ username: context.username });
        }

        return user.toJson();
    }

    public setRoutes(): void {
        /** router level caching */
        this.addRoute('get', '/', this.getProfile, { cache: true });

        /** nested controllers */
        // this.addChildController(Controller);
    }
}
