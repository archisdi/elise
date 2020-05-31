import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';

import ExceptionHandler from './middlewares/exception';
import NotFoundHandler from './middlewares/not_found';
import { StaticBaseController } from './controllers/base/base_controller';

export default abstract class BaseApp {
    protected _app: express.Application;
    protected _port: number;

    public constructor(port: number) {
        this._app = express();
        this._port = port;
        this.setPlugins();
        this.setSingletons();
        this.setControllers();
        this.setExceptionHandlers();
    }

    abstract setSingletons(): void;
    abstract setControllers(): void;

    public get app(): express.Application {
        return this._app;
    }

    public get port(): number {
        return this._port;
    }

    public addController(controller: StaticBaseController): void {
        const ctrl = new controller();
        this.app.use(ctrl.path, ctrl.routes);
    }

    private setPlugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private setExceptionHandlers(): void {
        this.app.use(NotFoundHandler);
        this.app.use(ExceptionHandler);
    }

    protected start(): void {
        this.app.listen(this.port, (): void => {
            console.info('server started on port: ' + this.port);
        });
    }
}
