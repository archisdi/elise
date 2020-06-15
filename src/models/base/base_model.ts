import { GenericStaticClass, IObject } from 'src/typings/common';

export interface StaticSqlModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface StaticMongoModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface StaticRedisModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}

export abstract class BaseModel<P = IObject> {
    protected props: P;
    protected hidden: string[] = [];

    public constructor(props: P) {
        this.props = props;
    }

    public toJson(option?: { withHidden?: boolean; withTimeStamps?: boolean }): P {
        const data: any = this.props;
        if (!option?.withHidden) {
            this.hidden.forEach((prop): void => {
                delete data[prop];
            });
        }
        if (!option?.withTimeStamps) {
            delete data['created_at'];
            delete data['updated_at'];
            delete data['deleted_at'];
        }
        return data;
    }

    public async update(data: Partial<P>, options?: { save: boolean }): Promise<void> {
        this.props = {
            ...this.props,
            ...data
        };

        if (options?.save) {
            await this.save();
        }
    }

    public abstract save(): Promise<void>;

    public async validate(): Promise<void> {
        throw new Error('Not Implemented');
    }
}
