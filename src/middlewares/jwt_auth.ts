/// <reference types="../typings/express" />

import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'tymon';
import { Tokenable } from '../typings/auth';
import { IContext } from '../typings/common';
import { COMMON_ERRORS } from '../utils/constant';
import JWT from '../utils/jwt';

const JWT_EXPIRED_MESSAGE = 'jwt expired';

const generateContext = async (payload: Tokenable): Promise<IContext> => {
    return {
        username: payload.username,
        user_id: payload.user_id
    };
};

const JwtMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token: string | undefined = req.headers.authorization;
        if (!token) {
            throw HttpError.UnauthorizedError('token not provided', COMMON_ERRORS.TOKEN_INVALID);
        }

        try {
            const tokenPayload: Tokenable = await JWT.verifyToken(token);
            req.context = await generateContext(tokenPayload);
        } catch (err) {
            const message =
                err.message === JWT_EXPIRED_MESSAGE
                    ? ['token expired', COMMON_ERRORS.TOKEN_EXPIRED]
                    : ['token invalid', COMMON_ERRORS.TOKEN_INVALID];

            throw HttpError.UnauthorizedError(message[0], message[1]);
        }

        return next();
    } catch (err) {
        return next(err);
    }
};


export default JwtMiddleware;
