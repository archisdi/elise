import SQLRepo from './base/sql_repository';
import { IContext } from 'src/typings/common';
import { User } from '../typings/models/user';
import { UserModel } from '../models/user_model';

export default class UserRepository extends SQLRepo<User, UserModel> {
    public constructor(context?: IContext) {
        super('User', UserModel, context);
    }
}
