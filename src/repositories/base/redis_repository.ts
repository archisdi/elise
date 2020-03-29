import BaseRepository from './base_repository';
import { IContext } from '../../typings/common';

type Context = IContext | null;

export default class RedisRepo extends BaseRepository {
    protected model: any;

    public constructor(model: string, context?: Context) {
        super(context);
        this.model = model;
    }

    public async findOne(key: string): Promise<any> {
        const redisClient = await this.getRedisInstance();
        return redisClient.get(`${this.model}-${key}`).then((res: any): any => JSON.parse(res));
    }

    public async create(key: string, payload: any, expires?: number): Promise<void> {
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
