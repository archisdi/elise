/// <reference types="../typings/express" />

import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon';
import JWT from '../libs/jwt';
import { IContext } from '../typings/common';
import { ITokenable } from '../typings/auth';
import { COMMON_ERRORS } from '../utils/constant';

const jwtExpiredMessage = 'jwt expired';

const generateContext = async (payload: ITokenable): Promise<IContext> => {
    return {
        username: payload.username,
        user_id: payload.user_id
    };
};

export default async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            throw HttpError.NotAuthorized('token not provided', COMMON_ERRORS.TOKEN_INVALID);
        }

        try {
            const tokenPayload: ITokenable = await JWT.verifyToken(token);
            req.context = await generateContext(tokenPayload);
        } catch (err) {
            const message =
                err.message === jwtExpiredMessage
                    ? ['token expired', COMMON_ERRORS.TOKEN_EXPIRED]
                    : ['token invalid', COMMON_ERRORS.TOKEN_INVALID];

            throw HttpError.NotAuthorized(...message);
        }

        return next();
    } catch (err) {
        return next(err);
    }
};
