export interface BaseSqlModelInterface<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName(): string;
    buildFromSql(...params: any): ClassModel;
}

export interface BaseMongoModelInterface<ClassModel = any> {
    new (...param: any): ClassModel;
    collectionName(): string;
    buildFromMongo(...params: any): ClassModel;
}

export interface BaseModelInterface<Model> {
    toJson(): Partial<Model>;
}

export class BaseModel {
    protected hidden?: string[];
    protected fillable?: string[];
}
