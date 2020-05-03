import BaseRepository from './base_repository';

export default class RedisRepo extends BaseRepository {
    protected model: any;

    public constructor(model: string) {
        super();
        this.model = model;
    }

    private parse(serialize: string): object | string {
        try {
            return JSON.parse(serialize);
        } catch (error) {
            return serialize;
        }
    }

    public async get(key: string): Promise<object | string> {
        const redisClient = await this.getRedisInstance();
        return redisClient.get(`${this.model}-${key}`).then((res: string): object | string => this.parse(res));
    }

    public async set(key: string, payload: any, expires?: number): Promise<void> {
        const redisClient = await this.getRedisInstance();
        const cacheKey = `${this.model}-${key}`;

        let cachePayload: string;
        if (typeof payload === 'object') {
            cachePayload = JSON.stringify(payload);
        } else {
            cachePayload = String(payload);
        }

        await redisClient.set(cacheKey, cachePayload);
        if (expires) {
            await redisClient.expire(cacheKey, expires);
        }
    }

    public async delete(key: string): Promise<void> {
        const redisClient = await this.getRedisInstance();
        await redisClient.del(`${this.model}-${key}`);
    }
}
