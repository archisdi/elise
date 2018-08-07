import { Response as res, Request as req, NextFunction as next } from 'express';

export default (req: req, res: res, next: next) => {
  const err: any = new Error('Not Found');
  err.code = 404;
  return next(err);
};
