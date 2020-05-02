export interface StaticClass<ModelDefinition, ClassModel> {
    new (data: ModelDefinition): ClassModel;
}
