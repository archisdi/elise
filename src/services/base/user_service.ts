import RedisRepo from '../../repositories/base/redis_repository';
import BaseService from './base/service';

export class UserService extends BaseService {
    private user_id: string;

    public constructor(userId: string) {
        super();
        this.user_id = userId;
    }

    public static create(userId: string): UserService {
        return new UserService(userId);
    }

    public async setCache<CacheInterface>(cacheName: string, payload: any, expires?: number): Promise<void> {
        const cacheRepo = new RedisRepo<CacheInterface>(this.user_id);
        await cacheRepo.setHash(cacheName, payload, expires);
    }

    public async getCache<CacheInterface = any>(cacheName: string): Promise<CacheInterface | null> {
        const cacheRepo = new RedisRepo<CacheInterface>(this.user_id);
        return cacheRepo.getHash(cacheName);
    }

    public async bustCache<CacheInterface = any>(cacheName?: string): Promise<void> {
        const cacheRepo = new RedisRepo<CacheInterface>(this.user_id);
        cacheName ?
            await cacheRepo.deleteHash(cacheName):
            await cacheRepo.delete(this.user_id) ;
    }
}

export default UserService;
