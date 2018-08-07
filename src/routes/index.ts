import { Application as app, Router } from 'express';
import AuthController from '../controllers/AuthController';
const router: Router = Router();

router.get('/:id', AuthController.login);

export default (app: app) => {
  app.use(router);
};
