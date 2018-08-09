import { Application as app, Router } from 'express';
import UserController from '../controllers/user_controller';
import AuthController from '../controllers/auth_controller';

const router: Router = Router();

router.post('/login', AuthController.login);

export default (app: app) => {
  app.use(router);
};
