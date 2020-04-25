import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { COMMON_ERRORS } from '../utils/constant';
import { IHttpError, IHttpOutput } from '../typings/common';

export default (err: any, req: Request, res: Response, next: NextFunction): object => {
    const { message, status = INTERNAL_SERVER_ERROR, name, data }: IHttpError = err;

    let stack: any = err && err.stack;
    stack = stack ? stack.split('\n').map((item: any): string[] => item.trim()) : null;

    const response: IHttpOutput = {
        meta: {
            error_type: status === INTERNAL_SERVER_ERROR ? COMMON_ERRORS.SERVER_ERROR : name,
            error_message: message || null,
            error_data: data,
            stack,
            code: status
        }
    };

    return res.status(status).json(response);
};
