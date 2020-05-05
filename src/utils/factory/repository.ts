import SQLRepo from '../../repositories/base/sql_repository';
import { BaseSqlModelInterface } from 'src/models/base/base_model';
import RedisRepo from 'src/repositories/base/redis_repository';

export default class RepoService {
    public static getSql<ModelClass>(modelClass: BaseSqlModelInterface<ModelClass>): SQLRepo<ModelClass> {
        return new (class Repository extends SQLRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }

    public static getRedis<Model>(modelName: string): RedisRepo<Model> {
        return new (class Repository extends RedisRepo<Model> {
            public constructor() {
                super(modelName);
            }
        })();
    }
}
