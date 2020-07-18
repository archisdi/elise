import { DBContext, HttpError } from 'tymon';
import BaseController from '../controllers/base/base_controller';
import jwt_auth from '../middlewares/jwt_auth';
import { BaseModel } from '../models/base/base_model';
import { GenericStaticClass, IContext, IData, IObject, IPagination } from '../typings/common';
import { CLEARANCE } from '../utils/constant';
import { COMMON_SCHEME, SchemeValidator } from '../utils/validator';
import RepoFactory from './repository';

export interface ControllerOpts {
    auth?: boolean;
    path?: string;
    resource?: string;
    roles?: CLEARANCE | CLEARANCE[];
}

export interface StaticModel<ClassModel = BaseModel> {
    new (...params: any): ClassModel;
    fillable: string[];
    modelName: string;
    buildFromSql(...params: any): ClassModel;
    create(...params: any): ClassModel;
}

export interface CrudController<ModelProperties> {
    create(data: IData, context: IContext): Promise<ModelProperties>
    list(data: IData, context: IContext): Promise<{ data: ModelProperties[]; pagination: IPagination }>
    detail(data: IData, context: IContext): Promise<ModelProperties>
    update(data: IData, context: IContext): Promise<ModelProperties>
    delete(data: IData, context: IContext): Promise<void>
}

const genericQueryBuilder = (keys: string[], query: IObject): IObject => {
    const db = DBContext.getInstance();
    const Op = db.ORMProvider.Op;
    const conditions: IObject = {};

    keys.forEach(key => {
        if (query[key]) {
            conditions[key] = { [Op.like]: `%${query[key]}%` };
        }
    });

    return conditions;
};

export const RestfulControllerFactory = <ModelClass extends StaticModel<BaseModel>>(Model: ModelClass, options?: ControllerOpts): GenericStaticClass<BaseController> => {
    type ModelProps = ConstructorParameters<typeof Model>[0];

    const InstanceName = Model.modelName.toUpperCase();
    const PathName = `/${Model.modelName.toLowerCase()}`;

    return class GeneratedController extends BaseController implements CrudController<ModelProps> {
        public constructor() {
            super({
                path: options?.path || PathName,
                middleware: options?.auth === false ? undefined : jwt_auth(options?.roles)
            });
        }

        public async create(data: IData<any, any, ModelProps>, context: IContext): Promise<ModelProps> {
            const modelInstance = Model.create(data.body);
            await modelInstance.validate();
            await modelInstance.save();
            return modelInstance.toJson({ removeHidden: true });
        }

        public async list(data: IData, context: IContext): Promise<{ data: ModelProps[]; pagination: IPagination }> {
            const query = await SchemeValidator(data.query, COMMON_SCHEME.PAGINATION);

            const conditions = genericQueryBuilder(Model.fillable, data.query);
            const ModelRepo = RepoFactory.getSql(Model);
            const datas = await ModelRepo.paginate(conditions, query);

            return {
                data: datas.data.map(item => item.toJson({ removeHidden: true })),
                pagination: datas.meta
            };
        }

        public async detail(data: IData, context: IContext): Promise<ModelProps> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelData = await ModelRepo.findById(data.params.id);
            if (!modelData) {
                throw HttpError.NotFoundError(`${InstanceName}_NOT_FOUND`);
            }
            return modelData.toJson({ removeHidden: true });
        }

        public async update(data: IData<any, { id: string }, ModelProps>, context: IContext): Promise<ModelProps> {
            const ModelRepo = RepoFactory.getSql(Model);
            const modelInstance = await ModelRepo.findById(data.params.id);

            if (!modelInstance) {
                throw HttpError.NotFoundError(`${InstanceName}_NOT_FOUND`);
            }

            /** auto validate and save */
            await modelInstance.update(data.body, { validate: true, save: true });
            return modelInstance.toJson({ removeHidden: true });
        }

        public async delete(data: IData, context: IContext): Promise<void> {
            const ModelRepo = RepoFactory.getSql(Model);
            await ModelRepo.delete({ id: data.params.id } as any);
        }

        public setRoutes(): void {
            if (options?.resource) {
                const resource = options.resource.split('').map(i => i.toUpperCase());
                if (resource.includes('C')) {
                    this.addRoute('post', '/', this.create);
                }
                if (resource.includes('R')) {
                    this.addRoute('get', '/', this.list);
                    this.addRoute('get', '/:id', this.detail);
                }
                if (resource.includes('U')) {
                    this.addRoute('put', '/:id', this.update);
                }
                if (resource.includes('D')) {
                    this.addRoute('delete', '/:id', this.delete);
                }
            } else {
                this.addRoute('post', '/', this.create);
                this.addRoute('get', '/', this.list);
                this.addRoute('get', '/:id', this.detail);
                this.addRoute('put', '/:id', this.update);
                this.addRoute('delete', '/:id', this.delete);
            }
        }
    };
};

export default RestfulControllerFactory;
