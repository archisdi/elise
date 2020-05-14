import { IContext, IData, IHandlerOutput } from 'src/typings/common';
import AuthMiddleware from '../middlewares/auth';
import UserRepository from '../repositories/user_sql_repo';
import BaseController from './base/base_controller';
import RepoService from '../utils/factory/repository';
import { UserDefinition } from 'src/models/user_model';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: IData, context: IContext): Promise<IHandlerOutput> {
        const userRepo = new UserRepository();
        const userRedisRepo = RepoService.getRedis<UserDefinition>('user');

        /** simulate caching */
        let user = await userRedisRepo.get(context.user_id);
        if (!user) {
            const userModel = await userRepo.findOneOrFail({ username: context.username });
            user = userModel.toJson();
        }

        return {
            data: user
        };
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
