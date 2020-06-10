import { OrderItem } from 'sequelize/types';
import { HttpError } from 'tymon';
import { StaticSqlModel } from '../../models/base/base_model';
import { Attributes, BasicType, IPagination, QueryOptions } from '../../typings/common';
import { offset, sorter } from '../../utils/helpers';
import DBContext from 'tymon/modules/db';

const DEFAULT = {
    SORT: '-created_at'
};

export default class SQLRepo<ModelClass> {
    private modelName: string;
    private model: StaticSqlModel<ModelClass>;

    public constructor(modelClass: StaticSqlModel<ModelClass>) {
        this.model = modelClass;
        this.modelName = modelClass.modelName;
    }

    private build(data: any): ModelClass {
        return this.model.buildFromSql(data);
    }

    private buildMany(datas: any[]): ModelClass[] {
        return datas.map((data): ModelClass => this.build(data));
    }

    public async findById(id: string, attributes?: Attributes): Promise<ModelClass | null> {
        const db = DBContext.getInstance();
        return db.model[this.modelName]
            .findOne({ where: { id }, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOne(conditions: BasicType<ModelClass>, attributes?: Attributes): Promise<ModelClass | null> {
        const db = DBContext.getInstance();
        return db.model[this.modelName]
            .findOne({ where: conditions as any, attributes })
            .then((res: any): any => (res ? this.build(res) : null));
    }

    public async findOneOrFail(conditions: BasicType<ModelClass>, attributes?: Attributes): Promise<ModelClass> {
        return this.findOne(conditions, attributes).then(
            (res: any): ModelClass => {
                if (!res) throw HttpError.NotFoundError(`${this.modelName.toUpperCase()}_NOT_FOUND`);
                return this.build(res);
            }
        );
    }

    public async findAll(
        conditions: BasicType<ModelClass>,
        { sort = DEFAULT.SORT, attributes }: QueryOptions
    ): Promise<ModelClass[]> {
        const order = sorter(sort);
        const db = DBContext.getInstance();
        return db.model[this.modelName]
            .findAll({
                where: conditions as any,
                attributes,
                order: [order as OrderItem]
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
        const db = DBContext.getInstance();
        return db.model[this.modelName]
            .create(data, { transaction: await DBContext.getTransaction() })
            .then((res: any): any => this.build(res));
    }

    public async update(conditions: BasicType<ModelClass>, data: BasicType<ModelClass>): Promise<[number, any]> {
        const db = DBContext.getInstance();
        return db.model[this.modelName].update(data, {
            where: conditions as any,
            transaction: await DBContext.getTransaction()
        });
    }

    public async delete(conditions: BasicType<ModelClass>): Promise<number> {
        const db = DBContext.getInstance();
        return db.model[this.modelName].destroy({
            where: conditions as any,
            transaction: await DBContext.getTransaction()
        });
    }

    public async increment(
        conditions: BasicType<ModelClass>,
        fields: { [P in keyof ModelClass]?: P extends number ? number : never }
    ): Promise<any> {
        const db = DBContext.getInstance();
        return db.model[this.modelName].increment(fields, {
            where: conditions as any,
            transaction: await DBContext.getTransaction()
        });
    }

    public async paginate(
        conditions: BasicType<ModelClass>,
        { page = 1, per_page = 10, sort = DEFAULT.SORT, attributes }: QueryOptions
    ): Promise<{ data: ModelClass[]; meta: IPagination }> {
        const order = sorter(sort);
        const db = DBContext.getInstance();
        return db.model[this.modelName]
            .findAndCountAll({
                where: conditions as any,
                attributes,
                limit: per_page,
                offset: offset(page, per_page),
                order: [order as OrderItem]
            })
            .then(({ rows, count }): { data: ModelClass[]; meta: IPagination } => ({
                data: this.buildMany(rows),
                meta: { page, per_page, total_page: Math.ceil(count / per_page), total_data: count }
            }));
    }
}
