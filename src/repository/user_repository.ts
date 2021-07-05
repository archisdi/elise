import { SQLRepo } from '@archisdi/zuu';
import { UserModel, UserProperties } from '../entity/models/user_model';
import { UserRepository } from './interfaces/user_repository';

export class UserRepositoryImpl extends SQLRepo<UserModel, UserProperties> implements UserRepository {
    public constructor() {
        super(UserModel);
    }

    public async getTotalUser(): Promise<number> {
        return 999;
    }
}

export default UserRepositoryImpl;
