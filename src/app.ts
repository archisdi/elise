import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { HttpError, DBContext } from 'tymon';

import AuthController from './controllers/authentication';
import ProfileController from './controllers/profile';

import ExceptionHandler from './middleware/exception';
import NotFoundHandler from './middleware/not_found';

class App extends Server {

    private readonly SERVER_STARTED = 'server started on port: ';
    private port: number = 3000;

    constructor(port: number) {
        super(true);
        this.port = port;

        this.setupPlugins();
        this.setupModules();
        this.setupControllers();
        this.setupExceptionHandlers();
    }

    private setupControllers(): void {
        super.addControllers([
            new AuthController(),
            new ProfileController()
        ]);
    }

    private setupModules(): void {
        HttpError.initialize();
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '/src/models'
        });
    }

    private setupPlugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(helmet());
        this.app.use(cors());
    }

    private setupExceptionHandlers(): void {
        this.app.use(NotFoundHandler);
        this.app.use(ExceptionHandler);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            Logger.Imp(this.SERVER_STARTED + this.port);
        });
    }
}

export default App;
