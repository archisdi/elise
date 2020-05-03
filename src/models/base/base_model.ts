export interface BaseSqlModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName(): string;
    buildFromSql(...params: any): ClassModel;
}

export interface BaseMongoModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    collectionName(): string;
    buildFromMongo(...params: any): ClassModel;
}

export interface BaseModel<Model> {
    toJson(): Partial<Model>;
}
