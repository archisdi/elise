import BaseRepository from './base_repository';
import { IPagination } from '../../typings/common';
import { offset, sorter } from '../../utils/helpers';
import { BaseSqlModelInterface } from '../../models/base/base_model';
import { HttpError } from 'tymon';

type attributes = string[] | undefined;

const DEFAULT_SORT = '-created_at';

export default class SQLRepo<ModelClass> extends BaseRepository {
    protected modelName: string;
    protected model: BaseSqlModelInterface<ModelClass>;

    public constructor(modelClass: BaseSqlModelInterface<ModelClass>) {
        super();
        this.model = modelClass;
        this.modelName = modelClass.modelName();
    }

    private build(data: any): ModelClass {
        return this.model.buildFromSql(data);
    }

    private buildMany(datas: any[]): ModelClass[] {
        return datas.map((data): ModelClass => this.build(data));
    }

    public async findId(id: string, attributes?: attributes): Promise<ModelClass | null> {
        const db = await this.getDbInstance();
        return db[this.modelName].findOne({ where: { id }, attributes }).then((res: any): any => this.build(res));
    }

    public async findOne(conditions: Partial<ModelClass>, attributes?: attributes): Promise<ModelClass | null> {
        const db = await this.getDbInstance();
        return db[this.modelName]
            .findOne({ where: conditions, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOneOrFail(conditions: Partial<ModelClass>, attributes?: attributes): Promise<ModelClass> {
        return this.findOne(conditions, attributes).then(
            (res: any): ModelClass => {
                if (!res) throw HttpError.NotFound(`${this.modelName.toUpperCase()}_NOT_FOUND`);
                return this.build(res);
            }
        );
    }

    public async findAll(
        conditions: Partial<ModelClass>,
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

    public async upsert(search: Partial<ModelClass>, data: Partial<ModelClass>): Promise<void> {
        return this.findOne(search).then(
            (row): Promise<any> => {
                return row ? this.update(search, data) : this.create(data);
            }
        );
    }

    public async create(data: Partial<ModelClass>): Promise<ModelClass> {
        const db = await this.getDbInstance();
        return db[this.modelName]
            .create(data, { transaction: await this.getDbTransaction() })
            .then((res: any): any => this.build(res));
    }

    public async update(conditions: Partial<ModelClass>, data: Partial<ModelClass>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.modelName].update(data, {
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: Partial<ModelClass>): Promise<void> {
        const db = await this.getDbInstance();
        return db[this.modelName].delete({
            where: conditions,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(
        conditions: Partial<ModelClass>,
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
            .then(({ rows, count }: { rows: ModelClass[]; count: number }): {
                data: ModelClass[];
                meta: IPagination;
            } => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
