import { UserModel, UserProperties } from '../models/user_model';
import SQLRepo from './base/sql_repository';

export default class UserRepository extends SQLRepo<UserModel, UserProperties> {
    public constructor() {
        super(UserModel);
    }
}
