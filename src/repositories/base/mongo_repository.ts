import BaseRepository from './base_repository';
import { MakeAny } from '../../typings/common';
import { BaseMongoModelClass } from 'src/models/base/base_model';

export default class MongoRepo<ModelClass> extends BaseRepository {
    protected collection: string;
    protected model: BaseMongoModelClass<ModelClass>;

    public constructor(model: BaseMongoModelClass<ModelClass>) {
        super();
        this.model = model;
        this.collection = this.model.collectionName();
    }

    private build(data: any): ModelClass {
        return this.model.buildFromMongo(data);
    }

    private buildMany(datas: any): ModelClass[] {
        return datas.map((data: any): ModelClass => this.build(data));
    }

    public async findOne(condition: MakeAny<ModelClass>): Promise<ModelClass | null> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .findOne(condition)
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findAll(condition: MakeAny<ModelClass>): Promise<ModelClass[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .find(condition)
            .toArray()
            .then((res: any): any[] => this.buildMany(res));
    }

    public async createOne(payload: Partial<ModelClass>): Promise<ModelClass> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertOne(payload)
            .then((res: any): any => (res ? this.build(res.ops[0]) : null));
    }

    public async createMany(payloads: Partial<ModelClass>[]): Promise<ModelClass[]> {
        const db = await this.getMongoInstance();
        return db
            .collection(this.collection)
            .insertMany(payloads)
            .then((res: any): any[] => this.buildMany(res.ops));
    }

    public async updateOne(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).updateOne(condition, { $set: payload });
    }

    public async updateMany(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<void> {
        const db = await this.getMongoInstance();
        return db.collection(this.collection).update(condition, { $set: payload });
    }

    public async upsert(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<void> {
        return this.findOne(condition).then(
            (res): Promise<any> => (res ? this.updateOne(condition, payload) : this.createOne(payload))
        );
    }
}
