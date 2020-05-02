export interface BaseModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
}

export interface BaseModel<Model> {
    toJson(): Partial<Model>;
}
