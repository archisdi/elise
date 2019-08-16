import { Request, Response, NextFunction, RequestHandler } from 'express';
import { OK } from 'http-status-codes';
import { IContext, IData, methodHandler } from '../../typings/common';

const parseInput = (req: Request): IData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export default (method: methodHandler): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const data: IData = parseInput(req);
        const context: IContext = req && req.context;

        const { message = 'success', data: outData = {}, status = OK } = await method(data, context);

        return res.status(OK).json({
            message,
            status,
            content: outData
        });
    } catch (err) {
        return next(err);
    }
};
