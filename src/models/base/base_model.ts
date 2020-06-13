export interface StaticBaseModel<ClassModel> {
    new (...param: any): ClassModel;
}

export interface StaticSqlModel<ClassModel = any> extends StaticBaseModel<ClassModel> {
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface StaticMongoModel<ClassModel = any> extends StaticBaseModel<ClassModel> {
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface StaticRedisModel<ClassModel = any> extends StaticBaseModel<ClassModel> {
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}

export abstract class BaseModel<P> {
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
}
