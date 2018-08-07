import express from 'express';
import routesHandler from './routes';
import exceptionHandler from './exceptions';

const app: express.Application = express();

routesHandler(app);
exceptionHandler(app);

export default app;
