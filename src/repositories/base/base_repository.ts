import { DBContext, MongoContext, RedisContext, FirebaseContext, ElasticContext } from 'tymon';
import { IContext } from '../../typings/common';

type Context = IContext | null;

export class BaseRepository {
    public context: Context;
    private db: any = null;
    private mongo: any = null;
    private redis: any = null;
    private firebase: any = null;
    private elastic: any = null;

    public constructor(context: Context = null) {
        this.context = context;
    }

    public async getDbInstance(): Promise<any> {
        if (!this.db) {
            this.db = await DBContext.getInstance();
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
        return DBContext.getTransaction();
    }
}

export default BaseRepository;
