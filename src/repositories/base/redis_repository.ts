import RedisContext from 'tymon/modules/redis';

export default class RedisRepo<Model = any> extends RedisContext {
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

    public async get(key: string): Promise<Partial<Model> | null> {
        const redisClient = RedisRepo.getInstance();
        return redisClient
            .get(`${this.path}-${key}`)
            .then((res: string | null): Model | null => (res ? this.parse(res) : null));
    }

    public async set(key: string, payload: Partial<Model>, expires?: number): Promise<void> {
        const redisClient = RedisRepo.getInstance();
        const cacheKey = `${this.path}-${key}`;

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
        const redisClient = RedisRepo.getInstance();
        await redisClient.del(`${this.path}-${key}`);
    }
}
