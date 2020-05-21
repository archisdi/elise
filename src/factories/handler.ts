import { NextFunction, Request, RequestHandler, Response } from 'express';
import { OK } from 'http-status-codes';
import { IContext, IData, MethodHandler } from '../typings/common';

const parseInput = (req: Request): IData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export const HandlerFactory = (method: MethodHandler): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const data = parseInput(req);
        const context: IContext = req?.context;
        const outData: any = await method(data, context);
        return res.status(OK).json(outData);
    } catch (err) {
        return next(err);
    }
};

export default HandlerFactory;
