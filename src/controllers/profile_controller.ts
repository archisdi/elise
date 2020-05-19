import { IContext, IData } from 'src/typings/common';
import RepoFactory from '../factories/repository';
import AuthMiddleware from '../middlewares/jwt_auth';
import { UserModel } from '../models/user_model';
import UserRepository from '../repositories/user_sql_repo';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: IData, context: IContext): Promise<Partial<UserModel>> {
        const userRepo = new UserRepository();
        const userRedisRepo = RepoFactory.getRedis(UserModel);

        /** simulate caching */
        let user = await userRedisRepo.get(context.user_id);
        if (!user) {
            const userModel = await userRepo.findOneOrFail({ username: context.username });
            user = userModel.toJson();
        }

        return user;
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
