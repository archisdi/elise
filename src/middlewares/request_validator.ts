import { NextFunction, Request, Response } from 'express';
import Validator from '../utils/validator';

export default (schema: string): any => (req: Request, res: Response, next: NextFunction): any => {
    const { query, params, body } = req;

    return Validator({ query, params, body }, schema)
        .then((validated: any): void => {
            req.query = validated.query;
            req.params = validated.params;
            req.body = validated.body;
            return next();
        })
        .catch((err: Error): void => next(err));
};
