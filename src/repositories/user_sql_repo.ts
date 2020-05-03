import SQLRepo from './base/sql_repository';
import { UserModel, UserSqlClass } from '../models/user_model';

export default class UserRepository extends SQLRepo<UserModel> {
    public constructor() {
        super(UserSqlClass);
    }
}
