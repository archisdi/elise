import { NextFunction, Request, Response, RequestHandler } from 'express';
import Validator, { SCHEMA } from '../utils/validator';

const RequestValidator = (schema: SCHEMA): any => (req: Request, res: Response, next: NextFunction): RequestHandler => {
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


export default RequestValidator;
