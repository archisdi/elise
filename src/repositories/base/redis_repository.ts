import RedisContext from 'tymon/modules/redis';
import { IObject } from '../../typings/common';

class RedisRepo<Model = any> extends RedisContext {
    private path: string;

    public constructor(path: string) {
        super();
        this.path = path;
    }

    private parse(serialize: any): Model {
        try {
            return JSON.parse(serialize);
        } catch (error) {
            return serialize;
        }
    }

    private stringify(object: any): string {
        if (typeof object === 'object') {
            return JSON.stringify(object);
        }
        return String(object);
    }

    public async get(key: string): Promise<Partial<Model> | null> {
        const redisClient = RedisRepo.getInstance();
        return redisClient
            .get(`${this.path}-${key}`)
            .then((res: string | null): Model | null => (res ? this.parse(res) : null));
    }

    public async set(key: string, payload: Partial<Model>, expires?: number): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        const cacheKey = `${this.path}-${key}`;

        const cachePayload = this.stringify(payload);
        await redisClient.set(cacheKey, cachePayload);
        if (expires) {
            await this.setExpire(cacheKey, expires);
        }
    }

    public async delete(key: string): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        await redisClient.del(`${this.path}-${key}`);
    }

    public async setHash(key: string, payload: Partial<Model>, expires?: number): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        const cachePayload = this.stringify(payload);
        await redisClient.hset(this.path, key, cachePayload);
        if (expires) {
            await this.setExpire(key, expires);
        }
    }

    public async getHash(key: string): Promise<Model | null> {
        const redisClient = RedisRepo.getInstance();
        return redisClient.hget(this.path, key)
            .then((res: string | null): Model | null => (res ? this.parse(res) : null));

    }

    public async getAllHash(): Promise<IObject> {
        const redisClient = RedisRepo.getInstance();
        return redisClient.hgetall(this.path)
            .then((res: IObject): IObject => {
                Object.keys(res).forEach(key => {
                    res[key] = this.parse(res[key]);
                });
                return res;
            });
    }

    public async deleteHash(key: string): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        await redisClient.hdel(this.path, key);
    }

    public async setExpire(key: string, time = 600): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        await redisClient.expire(key, time);
    }
}

export default RedisRepo;
