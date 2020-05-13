import { MongoContext, RedisContext, FirebaseContext, ElasticContext } from 'tymon';
import { DBInstance, getInstance as getDBInstance, getTransaction as getDbTransaction } from 'tymon/modules/db';

export class BaseRepository {
    private db: DBInstance | null;
    private mongo: any = null;
    private redis: any = null;
    private firebase: any = null;
    private elastic: any = null;

    public constructor() {
        this.db = null;
    }

    public async getDbInstance(): Promise<DBInstance> {
        if (!this.db) {
            this.db = await getDBInstance();
        }
        return this.db;
    }

    public async getMongoInstance(): Promise<any> {
        if (!this.mongo) {
            this.mongo = await MongoContext.getInstance();
        }
        return this.mongo;
    }

    public async getRedisInstance(): Promise<any> {
        if (!this.redis) {
            this.redis = await RedisContext.getInstance();
        }
        return this.redis;
    }

    public async getFirebaseInstance(): Promise<any> {
        if (!this.firebase) {
            this.firebase = await FirebaseContext.getInstance();
        }
        return this.firebase;
    }

    public async getElasticInstance(): Promise<any> {
        if (!this.elastic) {
            this.elastic = await ElasticContext.getInstance();
        }
        return this.elastic;
    }

    public async getDbTransaction(): Promise<any> {
        return getDbTransaction();
    }
}

export default BaseRepository;
