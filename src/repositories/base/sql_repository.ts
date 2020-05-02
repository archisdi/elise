import BaseRepository from './base_repository';
import { IContext, IPagination } from '../../typings/common';
import { offset, sorter } from '../../utils/helpers';
import { StaticClass } from '../../typings/models/common';

type attributes = string[] | undefined;
type Context = IContext | null;

const DEFAULT_SORT = '-created_at';

export default class SQLRepo<ModelDefinition, ModelClass> extends BaseRepository {
    protected modelName: any;
    protected model: StaticClass<ModelDefinition, ModelClass>;

    public constructor(model: string, modelClass: StaticClass<ModelDefinition, ModelClass>, context?: Context) {
        super(context);
        this.modelName = model;
        this.model = modelClass;
    }

    private build(data: ModelDefinition | undefined): ModelClass | null {
        return data ? new this.model(data) : null;
    }

    private buildMany(datas: ModelDefinition[]): ModelClass[] {
        return datas.map((data): ModelClass => new this.model(data));
    }

    public async findId(id: string, attributes?: attributes): Promise<ModelDefinition | undefined> {
        const db = await this.getDbInstance();
        return db[this.modelName].findOne({ where: { id }, attributes });
    }

    public async findOne(
        conditions: Partial<ModelDefinition>,
        attributes?: attributes
    ): Promise<ModelClass | undefined> {
        const db = await this.getDbInstance();
        return db[this.modelName].findOne({ where: conditions, attributes }).then((res: any): any => this.build(res));
    }

    public async findAll(
        conditions: Partial<ModelDefinition>,
        sort: string = DEFAULT_SORT,
        attributes?: attributes
    ): Promise<ModelClass[]> {
        const db = await this.getDbInstance();
        const order = sorter(sort);

        return db[this.modelName]
            .findAll({
                where: conditions,
                attributes,
                order: [order]
            })
            .then((res: any): any => this.buildMany(res));
    }

    public async upsert(search: Partial<ModelDefinition>, data: Partial<ModelDefinition>): Promise<void> {
        return this.findOne(search).then(
            (row: ModelClass | undefined): Promise<any> => {
                const payload = { ...data, created_by: this.context ? this.context.user_id : null };
                return row ? this.update(search, payload) : this.create(payload);
            }
        );
    }

    public async create(data: Partial<ModelDefinition>): Promise<ModelDefinition> {
        const db = await this.getDbInstance();
        return db[this.modelName]
            .create(data, { transaction: await this.getDbTransaction() })
            .then((res: any): any => this.build(res));
    }

    public async update(conditions: Partial<ModelDefinition>, data: Partial<ModelDefinition>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.modelName].update(data, {
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: Partial<ModelDefinition>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.modelName].delete({
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(
        conditions: Partial<ModelDefinition>,
        { page = 1, per_page = 10, sort = DEFAULT_SORT },
        attributes?: attributes
    ): Promise<{ data: ModelClass[]; meta: IPagination }> {
        const db = await this.getDbInstance();
        const order = sorter(sort);
        return db[this.modelName]
            .findAndCountAll({
                where: conditions,
                attributes,
                limit: per_page,
                offset: offset(page, per_page),
                order: [order]
            })
            .then(({ rows, count }: { rows: ModelDefinition[]; count: number }): {
                data: ModelClass[];
                meta: IPagination;
            } => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
