import { MakeAny } from '../../typings/common';
import { StaticMongoModel } from '../../models/base/base_model';
import MongoContext from 'tymon/modules/mongodb';

export default class MongoRepo<ModelClass> extends MongoContext {
    private collection: string;
    private model: StaticMongoModel<ModelClass>;

    public constructor(model: StaticMongoModel<ModelClass>) {
        super();
        this.model = model;
        this.collection = this.model.collectionName;
    }

    private build(data: any): ModelClass {
        return this.model.buildFromMongo(data);
    }

    private buildMany(datas: any): ModelClass[] {
        return datas.map((data: any): ModelClass => this.build(data));
    }

    public async findOne(condition: MakeAny<ModelClass>): Promise<ModelClass | null> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .findOne(condition)
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findAll(condition: MakeAny<ModelClass>): Promise<ModelClass[]> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .find(condition)
            .toArray()
            .then((res: any): any[] => this.buildMany(res));
    }

    public async createOne(payload: Partial<ModelClass>): Promise<ModelClass> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .insertOne(payload)
            .then((res: any): any => (res ? this.build(res.ops[0]) : null));
    }

    public async createMany(payloads: Partial<ModelClass>[]): Promise<ModelClass[]> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .insertMany(payloads)
            .then((res: any): any[] => this.buildMany(res.ops));
    }

    public async updateOne(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<number> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .updateOne(condition, { $set: payload })
            .then(({ result }): number => result.nModified);
    }

    public async updateMany(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<number> {
        const db = MongoRepo.getInstance();
        return db
            .collection(this.collection)
            .updateMany(condition, { $set: payload })
            .then(({ result }): number => result.nModified);
    }

    public async upsert(condition: MakeAny<ModelClass>, payload: Partial<ModelClass>): Promise<void> {
        return this.findOne(condition).then(
            (res): Promise<any> => (res ? this.updateOne(condition, payload) : this.createOne(payload))
        );
    }
}
