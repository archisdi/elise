export interface BaseModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    modelName(): string;
}

export interface BaseModel<Model> {
    toJson(): Partial<Model>;
}
