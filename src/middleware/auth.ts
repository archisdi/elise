import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon';
import JWT from '../lib/jwt';
import { ITokenable, IContext } from 'src/typings/common';

const generateContext = async (payload: ITokenable): Promise<IContext> => {
    return {
        username: payload.user_id,
        user_id: payload.user_id
    };
};

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            throw HttpError.NotAuthorized('token not provided');
        }

        try {
            const tokenPayload: ITokenable = await JWT.verifyToken(token);
            req.context = await generateContext(tokenPayload);
        } catch (err) {
            const message = err.message === 'jwt expired' ? 'token expired' : 'invalid token';
            throw HttpError.NotAuthorized(message);
        }

        return next();
    } catch (err) {
        return next(err);
    }
};
