import { HttpError } from 'tymon';
import BaseController from '../controllers/base/base_controller';
import jwt_auth from '../middlewares/jwt_auth';
import { StaticSqlModel, BaseModel } from '../models/base/base_model';
import { IContext, IData, IPagination, GenericStaticClass } from '../typings/common';
import RepoFactory from './repository';

interface Opts {
    auth: boolean;
    path: string;
}

export interface CrudController<ModelProperties> {
    create(data: IData, context: IContext): Promise<ModelProperties>
    list(data: IData, context: IContext): Promise<{ data: ModelProperties[]; pagination: IPagination }>
    detail(data: IData, context: IContext): Promise<ModelProperties>
    update(data: IData, context: IContext): Promise<void>
    delete(data: IData, context: IContext): Promise<void>
}

export const RestfulControllerFactory = <ModelClass extends StaticSqlModel<BaseModel<ModelClass>>>(Model: ModelClass, options: Opts): GenericStaticClass<BaseController> => {
    type ModelProps = ConstructorParameters<typeof Model>[0];

    const InstanceName = Model.modelName.toUpperCase();

    return class GeneratedController extends BaseController implements CrudController<ModelProps> {
        public constructor() {
            super({
                path: options.path,
                middleware: options.auth ? jwt_auth : undefined
            });
        }

        public async create(data: IData<any, any, ModelProps>, context: IContext): Promise<ModelProps> {
            const modelInstance = new Model(data.body);
            await modelInstance.validate();
            await modelInstance.save();
            return modelInstance.toJson();
        }

        public async list(data: IData, context: IContext): Promise<{ data: ModelProps[]; pagination: IPagination }> {
            const ModelRepo = RepoFactory.getSql(Model);
            const datas = await ModelRepo.paginate({}, data.query);
            return {
                data: datas.data.map(item => item.toJson()),
                pagination: datas.meta
            };
        }

        public async detail(data: IData, context: IContext): Promise<ModelProps> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelData = await ModelRepo.findById(data.params.id);
            if (!modelData) {
                throw HttpError.NotFoundError(`${InstanceName}_NOT_FOUND`);
            }
            return modelData.toJson();
        }

        public async update(data: IData<any, { id: string }, ModelProps>, context: IContext): Promise<void> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelInstance = await ModelRepo.findById(data.params.id);

            if (!modelInstance) {
                throw HttpError.NotFoundError(`${InstanceName}_NOT_FOUND`);
            }

            modelInstance.update(data.body);
            await modelInstance.validate();
            await modelInstance.save();
        }

        public async delete(data: IData, context: IContext): Promise<void> {
            const ModelRepo = RepoFactory.getSql(Model);
            await ModelRepo.delete(data.params.id);
        }

        public setRoutes(): void {
            this.addRoute('post', '/', this.create);
            this.addRoute('get', '/', this.list);
            this.addRoute('get', '/:id', this.detail, { cache: true });
            this.addRoute('put', '/:id', this.update);
            this.addRoute('delete', '/:id', this.delete);
        }
    };
};

export default RestfulControllerFactory;
