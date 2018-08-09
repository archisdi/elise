import { Request, Response, NextFunction as Next } from 'express';
import { apiResponse } from '../utils/helpers';
import Auth from '../utils/auth';
import CustomError from '../utils/custom_error';

const login = async (req: Request, res: Response, next: Next) => {
  const auth = await Auth.validate(req.body);
  if (!auth) return next(CustomError('credential not found', 403));
  return apiResponse(res, 'login success', auth);
};

export default {
  login
};
