import SQLRepo from './base/sql_repository';
import { UserModel, UserClass } from '../models/user_model';

export default class UserRepository extends SQLRepo<UserModel> {
    public constructor() {
        super(UserClass);
    }
}
