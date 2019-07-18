import { Response, Request, NextFunction } from 'express';
import { HttpError } from 'tymon';
import { COMMON_ERRORS } from '../utils/constant';

export default (req: Request, res: Response, next: NextFunction) => {
  const err: any = HttpError.NotFound('route not found', COMMON_ERRORS.ROUTE_NOT_FOUND);
  return next(err);
};
