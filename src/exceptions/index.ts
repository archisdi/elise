import { Application as app } from 'express';
import NotFound from './not_found_exception';
import Handler from './handler';

export default (app: app) => {
  app.use(NotFound);
  app.use(Handler);
};
