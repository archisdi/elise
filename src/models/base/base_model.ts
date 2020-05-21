import RepoFactory from '../../factories/repository';
import SQLRepo from '../../repositories/base/sql_repository';

export interface StaticSqlModel<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface StaticMongoModel<ClassModel = any> {
    new (...param: any): ClassModel;
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface StaticRedisModel<ClassModel = any> {
    new (...param: any): ClassModel;
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}

export abstract class SqlModel<ModelClass> {
    protected hidden?: string[];
    protected fillable?: string[];
    protected repo: SQLRepo<ModelClass>;

    public constructor(model: StaticSqlModel<ModelClass>) {
        this.repo = RepoFactory.getSql(model);
    }

    protected removeTimestamps(data: { [s: string]: any }): void {
        delete data['created_at'];
        delete data['updated_at'];
        delete data['deleted_at'];
    }

    protected removeHidden(data: { [s: string]: any }): void {
        this.hidden?.forEach((param): void => {
            delete data[param];
        });
    }

    public abstract toJson(): {};
    public abstract save(): {};
}
