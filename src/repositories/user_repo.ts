import SQLRepo from './base/sql_repository';
import { IContext } from 'src/typings/common';
import { UserModel } from '../models/user_model';

export default class UserRepository extends SQLRepo<UserModel> {
    public constructor(context?: IContext) {
        super('User', UserModel, context);
    }
}
