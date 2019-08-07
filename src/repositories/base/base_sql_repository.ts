import BaseRepository from './base_repository';
import { IContext, IMeta, IObject } from '../../typings/common';
import { offset } from '../../utils/helpers';

type attributes = string[] | undefined;
type Context = IContext | null;

export default class SQLRepo extends BaseRepository {
    protected model: any;

    public constructor(model: string, context?: Context) {
        super(context);
        this.model = model;
    }

    public async findId(id: string, attributes?: attributes): Promise<any> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: { id }, attributes });
    }

    public async findOne(conditions: IObject, attributes?: attributes): Promise<any> {
        const db = await this.getDbInstance();
        return db[this.model].findOne({ where: conditions, attributes });
    }

    public async findAll(conditions: IObject, attributes?: attributes): Promise<any[]> {
        const db = await this.getDbInstance();
        return db[this.model].findAll({ where: conditions, attributes });
    }

    public async create(data: IObject): Promise<any> {
        const db = await this.getDbInstance();
        return db[this.model].create(data, { transaction: await this.getDbTransaction() });
    }

    public async update(conditions: IObject, data: IObject): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].update(data, {
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: IObject): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.model].delete({
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(conditions: IObject, { page = 1, limit = 10 }, attributes?: attributes, order = [['created_at', 'desc']]): Promise<{ data: any[]; meta: IMeta }> {
        const db = await this.getDbInstance();
        return db[this.model].findAndCountAll({
            where: conditions,
            attributes,
            limit,
            offset: offset(page, limit),
            order
        }).then(({ rows, count }: { rows: object[]; count: number }): { data: any[]; meta: IMeta } => ({
            data: rows,
            meta: { page, limit, total_page: Math.ceil(count / limit), total_data: count }
        }))
        ;
    }
}