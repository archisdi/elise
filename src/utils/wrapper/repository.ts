import SQLRepo from 'src/repositories/base/sql_repository';
import { BaseModelClass } from 'src/models/base/base_model';

export default class RepoService {
    public static getSql<ModelClass>(modelClass: BaseModelClass): SQLRepo<ModelClass> {
        return new (class UserRepository extends SQLRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }
}
