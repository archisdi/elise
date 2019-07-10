import { Response, Request, NextFunction } from 'express';
import { HttpError } from '../lib/http_error';

export default (req: Request, res: Response, next: NextFunction) => {
  const err: any = HttpError.NotFound;
  return next(err);
};
