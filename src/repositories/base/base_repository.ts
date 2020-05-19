import { DBInstance, getInstance as getDBInstance, getTransaction as getDbTransaction } from 'tymon/modules/db';
import { ElasticInstance, getInstance as getElasticInstance } from 'tymon/modules/elastic';
import { FirebaseInstance, getInstance as getFirebaseInstance } from 'tymon/modules/firebase';
import { getInstance as getMongoInstance, MongoInstance } from 'tymon/modules/mongodb';
import { getInstance as getRedisInstance, RedisInstance } from 'tymon/modules/redis';

export class BaseRepository {
    private db: DBInstance | null;
    private mongo: MongoInstance | null;
    private redis: RedisInstance | null;
    private firebase: FirebaseInstance | null;
    private elastic: ElasticInstance | null;

    public constructor() {
        this.db = null;
        this.mongo = null;
        this.redis = null;
        this.firebase = null;
        this.elastic = null;
    }

    public async getDbInstance(): Promise<DBInstance> {
        if (!this.db) {
            this.db = await getDBInstance();
        }
        return this.db;
    }

    public async getMongoInstance(): Promise<MongoInstance> {
        if (!this.mongo) {
            this.mongo = await getMongoInstance();
        }
        return this.mongo;
    }

    public async getRedisInstance(): Promise<RedisInstance> {
        if (!this.redis) {
            this.redis = await getRedisInstance();
        }
        return this.redis;
    }

    public async getFirebaseInstance(): Promise<FirebaseInstance> {
        if (!this.firebase) {
            this.firebase = await getFirebaseInstance();
        }
        return this.firebase;
    }

    public async getElasticInstance(): Promise<ElasticInstance> {
        if (!this.elastic) {
            this.elastic = await getElasticInstance();
        }
        return this.elastic;
    }

    public async getDbTransaction(): Promise<any> {
        return getDbTransaction();
    }
}

export default BaseRepository;
