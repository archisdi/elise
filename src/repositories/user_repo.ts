import SQLRepo from './base/base_sql_repository';
import { IContext } from 'src/typings/common';

export default class UserRepo extends SQLRepo {
    public constructor(context: IContext) {
        super('User', context);
    }
}
