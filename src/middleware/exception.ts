import { Request, Response, NextFunction } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  const {
        message,
        status = INTERNAL_SERVER_ERROR,
        detail
    } = err;

  let stack: any = err && err.stack;
  stack = stack ? stack.split('\n').map((item: any) => item.trim()) : null;

  return res.status(status).json({
    status,
    message,
    detail,
    stack
  });
};
