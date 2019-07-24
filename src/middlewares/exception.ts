import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { COMMON_ERRORS } from '../utils/constant';
import { IHttpError } from '../typings/common';

export default (err: any, req: Request, res: Response, next: NextFunction): object => {
    const {
        message,
        status = INTERNAL_SERVER_ERROR,
        name,
        data
    }: IHttpError = err;

    let stack: any = err && err.stack;
    stack = stack ? stack.split('\n').map((item: any): string[] => item.trim()) : null;

    return res.status(status).json({
        status,
        message,
        name: status === INTERNAL_SERVER_ERROR ? COMMON_ERRORS.SYSTEM_ERROR : name,
        data: data ? data : undefined,
        stack
    });
};
