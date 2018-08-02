import { Router, Request, Response } from 'express';
import db from '../models/sequelize';

const router: Router = Router();

const index = router.get('/', async (req: Request, res: Response) => {
  const user = await db.User.findOne({ where: { id: '1' } });
  res.json(user);
});

export default {
  index,
};
