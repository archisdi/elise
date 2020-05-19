import { UserModel } from '../models/user_model';
import SQLRepo from './base/sql_repository';

export default class UserRepository extends SQLRepo<UserModel> {
    public constructor() {
        super(UserModel);
    }
}
