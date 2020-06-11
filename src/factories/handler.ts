import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OK } from 'http-status-codes';
import { IContext, IData, MethodHandler } from '../typings/common';
import RedisRepo from '../repositories/base/redis_repository';

const ROUTE_CACHE_TIME = 600;

const parseInput = (req: Request): IData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export const HandlerFactory = (method: MethodHandler, isCached = false): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const data = parseInput(req);
        const context: IContext = req?.context;
        const outData: any = await method(data, context);

        /** route caching */
        if (isCached) {
            const PathCache = new RedisRepo<{ [s:string]: any }>('path');
            const cacheKey = `${context ? context.username : ''}${req.originalUrl}`;
            await PathCache.set(cacheKey, outData, ROUTE_CACHE_TIME);
        }

        return res.status(OK).json(outData);
    } catch (err) {
        return next(err);
    }
};

export default HandlerFactory;
