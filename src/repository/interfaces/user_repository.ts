import { SQLRepo } from '@archisdi/zuu';
import UserModel, { UserProperties } from '../../entity/models/user_model';

export interface UserRepository extends SQLRepo<UserModel, UserProperties> {
    getTotalUser(): Promise<number>
}

export default UserRepository;