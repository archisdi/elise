import BaseRepository from './base_repository';
import { IPagination, BasicType, IObject } from '../../typings/common';
import { offset, sorter, trimObjectKey } from '../../utils/helpers';
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
        this.modelName = modelClass.modelName;
    }

    private build(data: any): ModelClass {
        return this.model.buildFromSql(data);
    }

    private buildMany(datas: any[]): ModelClass[] {
        return datas.map((data): ModelClass => this.build(data));
    }

    public async findId(id: string, attributes?: attributes): Promise<ModelClass | null> {
        const db = await this.getDbInstance();
        return db.model[this.modelName].findOne({ where: { id }, attributes }).then((res: any): any => this.build(res));
    }

    public async findOne(conditions: BasicType<ModelClass>, attributes?: attributes): Promise<ModelClass | null> {
        const db = await this.getDbInstance();
        return db.model[this.modelName]
            .findOne({ where: conditions as any, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOneOrFail(conditions: BasicType<ModelClass>, attributes?: attributes): Promise<ModelClass> {
        return this.findOne(conditions, attributes).then(
            (res: any): ModelClass => {
                if (!res) throw HttpError.NotFoundError(`${this.modelName.toUpperCase()}_NOT_FOUND`);
                return this.build(res);
            }
        );
    }

    public async findAll(
        conditions: BasicType<ModelClass>,
        sort: string = DEFAULT_SORT,
        attributes?: attributes
    ): Promise<ModelClass[]> {
        const db = await this.getDbInstance();
        const order = sorter(sort);

        return db.model[this.modelName]
            .findAll({
                where: conditions as any,
                attributes,
                order: order
            })
            .then((res: any): any => this.buildMany(res));
    }

    public async upsert(search: BasicType<ModelClass>, data: BasicType<ModelClass>): Promise<void> {
        return this.findOne(search).then(
            (row): Promise<any> => {
                return row ? this.update(search, data) : this.create(data);
            }
        );
    }

    public async create(data: BasicType<ModelClass>): Promise<ModelClass> {
        const db = await this.getDbInstance();
        return db.model[this.modelName]
            .create(data, { transaction: await this.getDbTransaction() })
            .then((res: any): any => this.build(res));
    }

    public async update(conditions: BasicType<ModelClass>, data: BasicType<ModelClass>): Promise<[number, any]> {
        const db = await this.getDbInstance();
        return db.model[this.modelName].update(data, {
            where: conditions as any,
            transaction: await this.getDbTransaction()
        });
    }

    public async delete(conditions: BasicType<ModelClass>): Promise<number> {
        const db = await this.getDbInstance();
        return db.model[this.modelName].destroy({
            where: conditions as any,
            transaction: await this.getDbTransaction()
        });
    }

    public async paginate(
        conditions: BasicType<ModelClass>,
        { page = 1, per_page = 10, sort = DEFAULT_SORT },
        attributes?: attributes
    ): Promise<{ data: ModelClass[]; meta: IPagination }> {
        const db = await this.getDbInstance();
        const order = sorter(sort);
        return db.model[this.modelName]
            .findAndCountAll({
                where: conditions as any,
                attributes,
                limit: per_page,
                offset: offset(page, per_page),
                order: order
            })
            .then(({ rows, count }): { data: ModelClass[]; meta: IPagination } => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
