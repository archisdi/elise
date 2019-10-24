import BaseRepository from './base_repository';
import { IContext, IPagination } from '../../typings/common';
import { offset, sorter } from '../../utils/helpers';

type attributes = string[] | undefined;
type Context = IContext | null;

const DEFAULT_SORT = '-created_at';

export default class SQLRepo<Model> extends BaseRepository {
    protected model: any;

    public constructor(model: string, context?: Context) {
        super(context);
        this.model = model;
    }

    public async findId(id: string, attributes?: attributes): Promise<Model | undefined> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: { id }, attributes });
    }

    public async findOne(conditions: Partial<Model>, attributes?: attributes): Promise<Model | undefined> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: conditions, attributes });
    }

    public async findAll(
        conditions: Partial<Model>,
        sort: string = DEFAULT_SORT,
        attributes?: attributes
    ): Promise<Model[]> {
        const db = await this.getDbInstance();
        const order = sorter(sort);

        return db[this.model].findAll({
            where: conditions,
            attributes,
            order: [order]
        });
    }

    public async upsert(search: Partial<Model>, data: Partial<Model>): Promise<void> {
        return this.findOne(search).then(
            (row: Model | undefined): Promise<any> => {
                const payload = { ...data, created_by: this.context ? this.context.user_id : null };
                return row ? this.update(search, payload) : this.create(payload);
            }
        );
    }

    public async create(data: Partial<Model>): Promise<Model> {
        const db = await this.getDbInstance();
        return db[this.model].create(data, { transaction: await this.getDbTransaction() });
    }

    public async update(conditions: Partial<Model>, data: Partial<Model>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].update(data, {
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: Partial<Model>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].delete({
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(
        conditions: Partial<Model>,
        { page = 1, per_page = 10, sort = DEFAULT_SORT },
        attributes?: attributes
    ): Promise<{ data: Model[]; meta: IPagination }> {
        const db = await this.getDbInstance();
        const order = sorter(sort);
        return db[this.model]
            .findAndCountAll({
                where: conditions,
                attributes,
                limit: per_page,
                offset: offset(page, per_page),
                order: [order]
            })
            .then(({ rows, count }: { rows: Model[]; count: number }): { data: Model[]; meta: IPagination } => ({
                data: rows,
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
