import * as moment from 'moment';
import { BaseProps } from 'src/typings/common';
import { v4 as uuidv4 } from 'uuid';

interface ModelStaticClass<ClassInstance> {
    new(...params: any): ClassInstance
}

export interface StaticSqlModel<ClassModel = BaseModel> extends ModelStaticClass<ClassModel> {
    modelName: string;
    buildFromSql(...params: any): ClassModel;
}

export interface StaticMongoModel<ClassModel = BaseModel> extends ModelStaticClass<ClassModel> {
    collectionName: string;
    buildFromMongo(...params: any): ClassModel;
}

export interface StaticRedisModel<ClassModel = BaseModel> extends ModelStaticClass<ClassModel> {
    cacheName: string;
    buildFromRedis(...params: any): ClassModel;
}

export abstract class BaseModel<P extends BaseProps = BaseProps> {
    protected props: P;
    protected hidden: string[] = [];

    public constructor(props: P) {
        this.props = props;
    }

    public static fillable = ['id', 'created_at', 'updated_at'];

    public static generateId(): string {
        return uuidv4();
    }

    public static generateTimestamp(): string {
        return moment().toISOString();
    }

    public get id(): string {
        return this.props.id;
    }

    public set id(value: string) {
        this.props.id = value;
    }

    public get created_at(): string | null {
        return this.props.created_at;
    }

    public set created_at(value: string | null) {
        this.props.created_at = value;
    }

    public get updated_at(): string | null {
        return this.props.updated_at;
    }

    public set updated_at(value: string | null) {
        this.props.updated_at = value;
    }

    public toJson(option: { removeHidden?: boolean; removeTimestamps?: boolean } = { removeHidden: false, removeTimestamps: false }): P {
        const data: any = {
            ...this.props
        };
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
