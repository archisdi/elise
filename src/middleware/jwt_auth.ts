/// <reference types="zuu/modules/typings/express" />

import { NextFunction, Request, Response, RequestHandler } from 'express';
import { HttpError } from 'zuu';
import { Tokenable } from '../typings/auth';
import { Context } from '../typings/common';
import Auth from '../utility/auth';
import RESPONSE_CODE from '../entity/constant/response_code';
import CLEARANCE from '../entity/constant/clearance';

const JWT_EXPIRED_MESSAGE = 'jwt expired';

const generateContext = async (payload: Tokenable): Promise<Context> => {
    return {
        user_id: payload.user_id,
        username: payload.username,
        clearance: payload.clearance
    };
};

const JwtMiddleware = (roles?: CLEARANCE | CLEARANCE[]): RequestHandler => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationToken: string | undefined = req.headers.authorization;
        if (!authorizationToken) {
            throw new HttpError.UnauthorizedError('token not provided', RESPONSE_CODE.TOKEN_INVALID);
        }

        const [type, token] = authorizationToken.split(' ');
        if (!token || type !== 'Bearer') {
            throw new HttpError.UnauthorizedError('token signature invalid', RESPONSE_CODE.TOKEN_INVALID);
        }

        let context;
        try {
            const tokenPayload: Tokenable = await Auth.verifyJwtToken(token);
            context = await generateContext(tokenPayload);
        } catch (err) {
            const message =
                err.message === JWT_EXPIRED_MESSAGE
                    ? ['token expired', RESPONSE_CODE.TOKEN_EXPIRED]
                    : ['token invalid', RESPONSE_CODE.TOKEN_INVALID];

            throw new HttpError.UnauthorizedError(message[0], message[1]);
        }

        // check clearance / (not blocked)
        if (context.clearance === CLEARANCE.BLOCKED) {
            throw new HttpError.UnauthorizedError('access denied', RESPONSE_CODE.NO_ACCESS);
        }

        // check roles
        if (roles && roles instanceof Array) {
            if (!roles.includes(context.clearance)) {
                throw new HttpError.ForbiddenError('access denied', RESPONSE_CODE.NO_ACCESS);
            }
        } else if (roles && roles !== context.clearance) {
            throw new HttpError.ForbiddenError('access denied', RESPONSE_CODE.NO_ACCESS);
        }

        // assign context to request
        req.context = context;

        return next();
    } catch (err) {
        return next(err);
    }
};

export default JwtMiddleware;
