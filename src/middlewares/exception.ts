import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { HttpError } from 'tymon/modules/http_error';
import { COMMON_ERRORS } from '../utils/constant';

const GlobalExceptionHandler = (err: HttpError, req: Request, res: Response, next: NextFunction): Response => {
    const { message, httpStatus = INTERNAL_SERVER_ERROR, name, data, code } = err;

    let stack: any = err && err.stack;
    stack = stack ? stack.split('\n').map((item: any): string[] => item.trim()) : null;

    const response = {
        error_name: httpStatus === INTERNAL_SERVER_ERROR ? COMMON_ERRORS.SERVER_ERROR : name,
        error_message: message,
        error_code: code || httpStatus,
        error_data: data,
        stack
    };

    return res.status(httpStatus).json(response);
};

export default GlobalExceptionHandler;
