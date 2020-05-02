export interface BaseModelClass<ClassModel = any> {
    new (...param: any): ClassModel;
    fromSql?(...param: any): ClassModel;
}
