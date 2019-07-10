'use strict';

import { Request, Response, NextFunction } from 'express';
import Validator from '../lib/validator';

export default (schema: string) => (req: Request, res: Response, next: NextFunction) => {
    const {
        query, params, body
    } = req;

    return Validator({ query, params, body }, schema)
        .then((validated: any) => {
            req.query = validated.query;
            req.params = validated.params;
            req.body = validated.body;
            return next();
        })
        .catch((err: Error) => next(err));
};
