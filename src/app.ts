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

    constructor() {
        super(true);

        /** register plugins */
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(helmet());
        this.app.use(cors());

        /** register libs */
        HttpError.initialize();
        DBContext.initialize({
            connection_string: String(process.env.DB_CONNECTION_STRING),
            models_path: '/src/models'
        });

        /** register controllers */
        this.setupControllers();

        /** register error handler middleware */
        this.app.use(NotFoundHandler);
        this.app.use(ExceptionHandler);
    }

    private setupControllers(): void {
        super.addControllers([
            new AuthController(),
            new ProfileController()
        ]);
    }

    public start(port: number): void {
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port);
        });
    }
}

export default App;
