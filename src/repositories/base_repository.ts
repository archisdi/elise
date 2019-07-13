import { DBContext, MongoContext, RedisContext, FirebaseContext, ElasticContext } from 'tymon';

export default class BaseRepository {
    public context: object | null;
    private db: any = null;
    private mongo: any = null;
    private redis: any = null;
    private firebase: any = null;
    private elastic: any = null;

    constructor(context: any = null) {
        this.context = context;
    }

    public async getDbInstance() {
        if (!this.db) {
            this.db = await DBContext.getInstance();
        }
        return this.db;
    }

    public async getMongoInstance() {
        if (!this.mongo) {
            this.mongo = await MongoContext.getInstance();
        }
        return this.mongo;
    }

    public async getRedisInstance() {
        if (!this.redis) {
            this.redis = await RedisContext.getInstance();
        }
        return this.redis;
    }

    public async getFirebaseInstance() {
        if (!this.firebase) {
            this.firebase = await FirebaseContext.getInstance();
        }
        return this.firebase;
    }

    public async getElasticInstance() {
        if (!this.elastic) {
            this.elastic = await ElasticContext.getInstance();
        }
        return this.elastic;
    }

    public async getDbTransaction() {
        return DBContext.getTransaction();
    }

}
