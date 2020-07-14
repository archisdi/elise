declare module '*.json' {
    const value: any;
    export default value;
}

declare function require(name: string): any;

export interface IObject<D = any> {
    [s: string]: D;
}

export interface IPagination {
    page: number;
    per_page: number;
    total_page: number;
    total_data: number;
}

export interface IContext {
    username: string;
    user_id: string;
    clearance: number;
}

export interface IData<Query = any, Params = any, Body = any> {
    query: Query;
    params: Params;
    body: Body;
}

export type MethodHandler<HandlerOutput = any> = (data: IData, context: IContext) => Promise<HandlerOutput>;

export interface IHttpError {
    message: string;
    name: string;
    status: number;
    data?: IObject;
}

export interface IHttpOutput {
    data?: any;
    meta: {
        code: number;
        user_message?: string;
        error_message?: string | null;
        error_type?: string;
        error_data?: any;
        stack?: any[];
    };
    pagination?: IPagination;
}

export type MakeAny<T> = {
    [P in keyof T]?: any;
};

export type BasicType<T> = {
    [P in keyof T]?: P extends string | number | boolean ? T[P] : never;
};

export type OptionalRelation = IObject[] | undefined;

export type Attributes = string[];

export interface QueryOptions {
    page?: number;
    per_page?: number;
    sort?: string;
    attributes?: Attributes;
    cache?: boolean;
}

export interface BaseProps {
    id: string;
    created_at: string | null;
    updated_at: string | null;
    deleted_at?: string | null;
}

export interface GenericStaticClass<ClassInstance> {
    new(...params: any): ClassInstance
}

export type ModelProperties<ModelClass extends GenericStaticClass<ModelClass>> = ConstructorParameters<ModelClass>[0];
