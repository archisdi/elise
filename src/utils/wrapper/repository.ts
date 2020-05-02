import { UserModel } from 'src/models/user_model';
import SQLRepo from 'src/repositories/base/sql_repository';
import { BaseModelClass } from 'src/models/base/base_model';

const REPO_REGISTRY: { [x: string]: BaseModelClass } = {
    User: UserModel
};

export default class RepoService {
    public static get(modelName: string): SQLRepo<UserModel> {
        return new (class UserRepository extends SQLRepo<UserModel> {
            public constructor() {
                super(modelName, REPO_REGISTRY[modelName]);
            }
        })();
    }
}
