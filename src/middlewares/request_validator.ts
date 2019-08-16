'use strict';

import { Request, Response, NextFunction } from 'express';
import Validator from '../libs/validator';

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
