import { Response, Request, NextFunction } from 'express';
import { HttpError } from 'tymon';

export default (req: Request, res: Response, next: NextFunction) => {
  const err: any = HttpError.NotFound('route not found');
  return next(err);
};
