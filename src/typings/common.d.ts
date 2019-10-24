import { Router } from 'express';

declare module '*.json' {
    const value: any;
    export default value;
}

declare function require(name: string): any;

export interface IObject {
    [s: string]: any;
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
}

export interface IData {
    query: any;
    params: any;
    body: any;
}

export interface IHandlerOutput {
    message?: string;
    data?: any;
    status?: number;
    pagination?: IPagination;
}

export type methodHandler = (data: IData, context: IContext) => Promise<IHandlerOutput>;

export interface IHttpError {
    message: string;
    name: string;
    status: number;
    data?: object;
}

export interface IHttpOutput {
    data?: any;
    meta: {
        code: number;
        user_message?: string;
        error_message?: string | null;
        error_type?: string;
        error_data?: any;
    };
    pagination?: IPagination;
}

export declare function ArrayKeys<T extends object>(): (keyof T)[];
