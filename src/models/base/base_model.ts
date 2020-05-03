export interface BaseSqlModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName(): string;
    buildFromSql(...params: any): ClassModel;
}

export interface BaseMongoModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    collectionName(): string;
}

export interface BaseModel<Model> {
    toJson(): Partial<Model>;
}
