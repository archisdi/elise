import SQLRepo from './base/base_sql_repository';
import { IContext } from 'src/typings/common';
import { User, UserFillable } from '../typings/models/user';

export default class UserRepo extends SQLRepo<User, UserFillable> {
    public constructor(context: IContext) {
        super('User', context);
    }
}
