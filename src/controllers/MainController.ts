import { Router, Request, Response } from 'express';
import User from '../models/user';

const router: Router = Router();

const index = router.get('/:id', async (req: Request, res: Response) => {
  const user = await User.find(req.params.id);
  console.log(user);
  res.json(user);
});

export default {
  index
};
