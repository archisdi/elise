import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon';
import JWT from '../lib/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw HttpError.NotAuthorized('token not provided');
        }

        try {
            const payload = await JWT.verifyToken(token);
            req.context = payload;
        } catch (err) {
            const message = err.message === 'jwt expired' ? 'token expired' : 'invalid token';
            throw HttpError.NotAuthorized(message);
        }

        return next();
    } catch (err) {
        return next(err);
    }
};
