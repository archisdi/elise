import BaseRepository from './base_repository';
import { IContext, IPagination, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type attributes = string[] | undefined;
type Context = IContext | null;

export default class SQLRepo<Model, ModelFillable> extends BaseRepository {
    protected model: any;

    public constructor(model: string, context?: Context) {
        super(context);
        this.model = model;
    }

    public async findId(id: string, attributes?: attributes): Promise<Model | undefined> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: { id }, attributes });
    }

    public async findOne(conditions: ModelFillable, attributes?: attributes): Promise<Model | undefined> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: conditions, attributes });
    }

    public async findAll(conditions: ModelFillable, attributes?: attributes): Promise<Model[]> {
        const db = await this.getDbInstance();
        return db[this.model].findAll({ where: conditions, attributes });
    }

    public async upsert(search: ModelFillable, data: ModelFillable): Promise<void> {
        return this.findOne(search).then(
            (row: Model | undefined): Promise<any> => {
                const payload = { ...data, created_by: this.context ? this.context.user_id : null };
                return row ? this.update(search, payload) : this.create(payload);
            }
        );
    }

    public async create(data: ModelFillable): Promise<Model> {
        const db = await this.getDbInstance();
        return db[this.model].create(data, { transaction: await this.getDbTransaction() });
    }

    public async update(conditions: ModelFillable, data: ModelFillable): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].update(data, {
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: ModelFillable): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].delete({
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(
        conditions: ModelFillable,
        { page = 1, per_page = 10 },
        attributes?: attributes,
        order = [['created_at', 'desc']]
    ): Promise<{ data: Model[]; meta: IPagination }> {
        const db = await this.getDbInstance();
        return db[this.model]
            .findAndCountAll({
                where: conditions,
                attributes,
                per_page,
                offset: offset(page, per_page),
                order
            })
            .then(({ rows, count }: { rows: Model[]; count: number }): { data: Model[]; meta: IPagination } => ({
                data: rows,
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
