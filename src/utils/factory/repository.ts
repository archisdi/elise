import SQLRepo from '../../repositories/base/sql_repository';
import { BaseSqlModelInterface } from 'src/models/base/base_model';

export default class RepoService {
    public static getSql<ModelClass>(modelClass: BaseSqlModelInterface<ModelClass>): SQLRepo<ModelClass> {
        return new (class UserRepository extends SQLRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }
}
