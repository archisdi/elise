import { DBInstance, getInstance as getDBInstance, getTransaction as getDbTransaction } from 'tymon/modules/db';
import { MongoInstance, getInstance as getMongoInstance } from 'tymon/modules/mongodb';
import { RedisInstance, getInstance as getRedisInstance } from 'tymon/modules/redis';
import { FirebaseInstance, getInstance as getFirebaseInstance } from 'tymon/modules/firebase';
import { ElasticInstance, getInstance as getElasticInstance } from 'tymon/modules/elastic';

export class BaseRepository {
    private db: DBInstance | null;
    private mongo: MongoInstance | null = null;
    private redis: RedisInstance | null = null;
    private firebase: FirebaseInstance | null = null;
    private elastic: ElasticInstance | null = null;

    public constructor() {
        this.db = null;
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
