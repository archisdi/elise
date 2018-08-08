import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import routesHandler from './routes';
import exceptionHandler from './exceptions';

const app: express.Application = express();

/** Plugins */
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
/** */

routesHandler(app);
exceptionHandler(app);

export default app;
