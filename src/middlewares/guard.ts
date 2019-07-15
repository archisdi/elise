import { Request, Response, NextFunction } from 'express';
import { HttpError } from 'tymon';

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.query.secret !== process.env.API_SECRET && req.headers.secret !== process.env.API_SECRET) {
    return next(HttpError.Unauthorized('Not Authorized'));
  }

  return next();
};
