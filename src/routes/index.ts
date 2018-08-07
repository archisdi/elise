import { Application as app, Router } from 'express';
import UserController from '../controllers/user_controller';

const router: Router = Router();
router.get('/:id', UserController.show);

export default (app: app) => {
  app.use(router);
};
