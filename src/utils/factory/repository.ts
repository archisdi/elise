import SQLRepo from '../../repositories/base/sql_repository';
import { StaticSqlModel, StaticMongoModel, StaticRedisModel } from 'src/models/base/base_model';
import RedisRepo from '../../repositories/base/redis_repository';
import MongoRepo from '../../repositories/base/mongo_repository';

export default class RepoService {
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
