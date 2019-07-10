import { Request, Response, NextFunction } from 'express';
import { OK } from 'http-status-codes';

const parseInput = (req: Request) => ({
    query: req.query,
    params: req.params,
    body: req.body
});

export default (method: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = parseInput(req);
        const context = req && req.context ? req.context : null;

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
