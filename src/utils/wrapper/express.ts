import { Request, Response, NextFunction, RequestHandler } from 'express';
import { OK } from 'http-status-codes';
import { IContext, IData, methodHandler, IHandlerOutput } from '../../typings/common';

const parseInput = (req: Request): IData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export default (method: methodHandler): RequestHandler => async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> => {
    try {
        const data: IData = parseInput(req);
        const context: IContext = req && req.context;

        const { message = 'success', data: outData = {}, status = OK, pagination }: IHandlerOutput = await method(
            data,
            context
        );

        return res.status(OK).json({
            meta: {
                user_message: message,
                code: status
            },
            data: outData,
            pagination
        });
    } catch (err) {
        return next(err);
    }
};
