import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';
import { IContext, IData } from '../../typings/common';

const parseInput = (req: Request): IData => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export default (method: any): any => async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data: IData = parseInput(req);
        const context: IContext | null = req && req.context ? req.context : null;

        const {
            message = 'success', data: outData = {}
        } = await method(data, context);

        return res.status(OK).json({
            message,
            status: OK,
            content: outData
        });
    } catch (err) {
        return next(err);
    }
};
