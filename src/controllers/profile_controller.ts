import { IContext, IData, IHandlerOutput } from 'src/typings/common';
import AuthMiddleware from '../middlewares/auth';
import UserRepository from '../repositories/user_repo';
import BaseController from './base/base_controller';

export default class ProfileController extends BaseController {
    public constructor() {
        super();
        this.setMiddleware(AuthMiddleware);
    }

    public async getProfile(data: IData, context: IContext): Promise<IHandlerOutput> {
        const userRepo = new UserRepository();

        const user = await userRepo.findOneOrFail({ username: context.username });

        return {
            message: 'profile data retrieved',
            data: user.toJson()
        };
    }

    protected setRoutes(): void {
        this.addRoute('get', '/', this.getProfile);

        /** nested controllers */
        // this.addChildController(new Controller());
    }
}
