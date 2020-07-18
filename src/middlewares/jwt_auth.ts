/// <reference types="../typings/express" />

import { NextFunction, Request, Response } from 'express';
import { HttpError } from 'tymon';
import { Tokenable } from '../typings/auth';
import { IContext } from '../typings/common';
import Auth from '../utils/auth';
import { CLEARANCE, COMMON_ERRORS } from '../utils/constant';

const JWT_EXPIRED_MESSAGE = 'jwt expired';

const generateContext = async (payload: Tokenable): Promise<IContext> => {
    return {
        user_id: payload.user_id,
        username: payload.username,
        clearance: payload.clearance
    };
};

const JwtMiddleware = (roles?: CLEARANCE | CLEARANCE[]) => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationToken: string | undefined = req.headers.authorization;
        if (!authorizationToken) {
            throw HttpError.UnauthorizedError('token not provided', COMMON_ERRORS.TOKEN_INVALID);
        }

        const [type, token] = authorizationToken.split(' ');
        if (!token || type !== 'Bearer') {
            throw HttpError.UnauthorizedError('token signature invalid', COMMON_ERRORS.TOKEN_INVALID);
        }

        let context;
        try {
            const tokenPayload: Tokenable = await Auth.verifyJwtToken(token);
            context = await generateContext(tokenPayload);
        } catch (err) {
            const message =
                err.message === JWT_EXPIRED_MESSAGE
                    ? ['token expired', COMMON_ERRORS.TOKEN_EXPIRED]
                    : ['token invalid', COMMON_ERRORS.TOKEN_INVALID];

            throw HttpError.UnauthorizedError(message[0], message[1]);
        }

        // check clearance / (not blocked)
        if (context.clearance === CLEARANCE.BLOCKED) {
            throw HttpError.UnauthorizedError('access denied', COMMON_ERRORS.NO_ACCESS);
        }

        // check roles
        if (roles && roles instanceof Array) {
            if (!roles.includes(context.clearance)) {
                throw HttpError.ForbiddenError('access denied', COMMON_ERRORS.NO_ACCESS);
            }
        } else if (roles && roles !== context.clearance) {
            throw HttpError.ForbiddenError('access denied', COMMON_ERRORS.NO_ACCESS);
        }

        // assign context to request
        req.context = context;

        return next();
    } catch (err) {
        return next(err);
    }
};

export default JwtMiddleware;
