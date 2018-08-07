import { Request, Response, NextFunction as Next } from 'express';
import UserRepo from '../repositories/user_repo';
import CustomError from '../utils/custom_error';
import auth from '../utils/jwt';

const login = async (req: Request, res: Response, next: Next) => {
  const user = await UserRepo.findOne({ id: req.params.id });
  return res.json(user);
};

export default {
  login
};
