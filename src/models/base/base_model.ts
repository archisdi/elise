import RepoService from '../../utils/factory/repository';
import SQLRepo from '../../repositories/base/sql_repository';

export interface BaseSqlModelInterface<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface BaseMongoModelInterface<ClassModel = any> {
    new (...param: any): ClassModel;
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface BaseModelInterface<Model> {
    toJson(t: boolean, s: boolean): Partial<Model>;
    save(): Promise<void>;
}

export abstract class BaseModel<ModelClass> {
    protected hidden?: string[];
    protected fillable?: string[];
    protected repo: SQLRepo<ModelClass>;

    public constructor(model: BaseSqlModelInterface<ModelClass>) {
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
}
