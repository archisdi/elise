import { SQLRepo } from 'zuu';
import { UserModel, UserProperties } from '../models/user_model';

export default class UserRepository extends SQLRepo<UserModel, UserProperties> {
    public constructor() {
        super(UserModel);
    }
}
