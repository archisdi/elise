export interface BaseModelClass<ClassModel> {
    new (...param: any): ClassModel;
    fromSql?(...param: any): ClassModel;
}
