import SQLRepo from './base/sql_repository';
import { IContext } from 'src/typings/common';
import { User, UserFillable } from '../typings/models/user';

export default class UserRepository extends SQLRepo<User, UserFillable> {
    public constructor(context?: IContext) {
        super('User', context);
    }
}
