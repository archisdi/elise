import SQLRepo from './base/sql_repository';
import { IContext } from 'src/typings/common';
import { User } from '../typings/models/user';

export default class UserRepository extends SQLRepo<User> {
    public constructor(context?: IContext) {
        super('User', context);
    }
}
