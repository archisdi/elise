import { StaticMongoModel, StaticRedisModel, StaticSqlModel } from 'src/models/base/base_model';
import MongoRepo from '../repositories/base/mongo_repository';
import RedisRepo from '../repositories/base/redis_repository';
import SQLRepo from '../repositories/base/sql_repository';

class RepoFactory {
    public static getSql<ModelClass>(modelClass: StaticSqlModel<ModelClass>): SQLRepo<ModelClass> {
        return new (class Repository extends SQLRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }

    public static getMongo<ModelClass>(modelClass: StaticMongoModel<ModelClass>): MongoRepo<ModelClass> {
        return new (class Repository extends MongoRepo<ModelClass> {
            public constructor() {
                super(modelClass);
            }
        })();
    }

    public static getRedis<ModelClass>(modelClass: StaticRedisModel<ModelClass>): RedisRepo<ModelClass> {
        return new (class Repository extends RedisRepo<ModelClass> {
            public constructor() {
                super(modelClass.cacheName);
            }
        })();
    }
}

export default RepoFactory;
