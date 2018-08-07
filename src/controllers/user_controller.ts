import { Request, Response, NextFunction as Next } from 'express';
import { apiResponse } from '../utils/helpers';
import UserRepo from '../repositories/user_repo';

const show = async (req: Request, res: Response, next: Next) => {
  const user = await UserRepo.findOne({ id: req.params.id });
  return apiResponse(res, 'user found', user);
};

export default {
  show
};
