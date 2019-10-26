import BaseRepository from './base_repository';
import { IContext, MakeAny } from '../../typings/common';
// import { offset } from '../../utils/helpers';

type Context = IContext | null;

export default class MongoRepo<Model> extends BaseRepository {
    protected collection: string;

    public constructor(collection: string, context?: Context) {
        super(context);
        this.collection = collection;
    }

    public async findOne(condition: MakeAny<Model>): Promise<Model | undefined> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).findOne(condition);
    }

    public async findAll(condition: MakeAny<Model>): Promise<Model[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .find(condition)
            .toArray();
    }

    public async createOne(payload: Partial<Model>): Promise<Model> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertOne(payload)
            .then((res: any): any => res.ops[0]);
    }

    public async createMany(payloads: Partial<Model>[]): Promise<Model[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertMany(payloads)
            .then((res: any): any => res.ops);
    }

    public async updateOne(condition: MakeAny<Model>, payload: Partial<Model>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).updateOne(condition, { $set: payload });
    }

    public async updateMany(condition: MakeAny<Model>, payload: Partial<Model>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).update(condition, { $set: payload });
    }

    public async upsert(condition: MakeAny<Model>, payload: Partial<Model>): Promise<void> {
        return this.findOne(condition).then(
            (res): Promise<any> => (res ? this.updateOne(condition, payload) : this.createOne(payload))
        );
    }
}
