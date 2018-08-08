import { Request as req, Response as res, NextFunction as next } from 'express';
import CustomError from '../utils/custom_error';

export default (req: req, res: res, next: next) => {
  if (req.query.secret !== process.env.API_SECRET && req.headers.secret !== process.env.API_SECRET) {
    return next(CustomError('Not Authorized', 401));
  }

  return next();
};
