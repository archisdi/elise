import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from '../utils/constant';

const StaticAuth = (req: Request, res: Response, next: NextFunction): void => {
    if (req.query.secret !== process.env.API_SECRET && req.headers.secret !== process.env.API_SECRET) {
        return next(HttpError.UnauthorizedError('token invalid', COMMON_ERRORS.TOKEN_INVALID));
    }

    return next();
};

export default StaticAuth;
