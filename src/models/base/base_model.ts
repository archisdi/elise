import * as moment from 'moment';
import { BaseProps, GenericStaticClass } from 'src/typings/common';
import { v4 as uuidv4 } from 'uuid';

export interface StaticSqlModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface StaticMongoModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface StaticRedisModel<ClassModel = BaseModel> extends GenericStaticClass<ClassModel> {
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}

export abstract class BaseModel<P extends BaseProps = BaseProps> {
    protected props: P;
    protected hidden: string[] = [];

    public constructor(props: P) {
        this.props = props;
        if (!this.props.id) this.props.id = uuidv4();

        const now = moment().toISOString();
        if (!this.props.created_at) this.props.created_at = now;
        if (!this.props.updated_at) this.props.updated_at = now;
    }

    public get id(): string {
        return this.props.id;
    }

    public set id(value: string) {
        this.props.id = value;
    }

    public get created_at(): string {
        return this.props.created_at;
    }

    public set created_at(value: string) {
        this.props.created_at = value;
    }

    public get updated_at(): string {
        return this.props.updated_at;
    }

    public set updated_at(value: string) {
        this.props.updated_at = value;
    }

    public toJson(option: { removeHidden?: boolean; removeTimestamps?: boolean } = { removeHidden: false, removeTimestamps: false }): P {
        const data: any = this.props;
        if (option.removeHidden) {
            this.hidden.forEach((prop): void => {
                delete data[prop];
            });
        }
        if (option.removeTimestamps) {
            delete data['created_at'];
            delete data['updated_at'];
            delete data['deleted_at'];
        }
        return data;
    }

    public async update(data: Partial<P>, options?: { save?: boolean; validate?: boolean; }): Promise<void> {
        this.props = {
            ...this.props,
            ...data
        };

        if (options?.validate) {
            await this.validate();
        }

        if (options?.save) {
            await this.save();
        }
    }

    public abstract save(): Promise<void>;

    public async validate(): Promise<void> {
        throw new Error('model validation not implemented');
    }
}
