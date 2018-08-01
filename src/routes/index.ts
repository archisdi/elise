import { Application as app } from 'express';
import MainController from '../controllers/MainController';

export default (app: app) => {
    app.use('/', MainController.index);
};
