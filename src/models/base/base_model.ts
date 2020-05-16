import RepoService from '../../utils/factory/repository';
import SQLRepo from '../../repositories/base/sql_repository';
import { BasicType } from 'src/typings/common';

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

export interface GeneralModelInterface<Model> {
    toJson(t: boolean, s: boolean): Partial<Model>;
    save(): Promise<void>;
}

export abstract class SqlModel<ModelClass> implements GeneralModelInterface<BasicType<ModelClass>> {
    protected hidden?: string[];
    protected fillable?: string[];
    protected repo: SQLRepo<ModelClass>;

    public constructor(model: StaticSqlModel<ModelClass>) {
        this.repo = RepoService.getSql(model);
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

    // Overriding
    public toJson(isProtected: boolean = true, withTimestamp: boolean = true): any {
        throw new Error('toJson method is not implemented');
    }

    // Overriding
    public async save(): Promise<void> {
        throw new Error('save method is not implemented');
    }
}
