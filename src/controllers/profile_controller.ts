import { IContext, IData } from 'src/typings/common';
import RepoFactory from '../factories/repository';
import AuthMiddleware from '../middlewares/jwt_auth';
import { UserModel } from '../models/user_model';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: IData, context: IContext): Promise<any> {
        /** simulate caching */
        let user = await UserModel.findFromCache(context.user_id);
        if (!user) {
            user = await UserModel.repo.findOneOrFail({ username: context.username });
        }

        return user.toJson();
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
