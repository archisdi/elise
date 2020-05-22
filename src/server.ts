import * as env from 'dotenv';
import App from './app';

/**  */
((): void => {
    /** load envs */
    env.config();

    /** parse envs */
    const port = Number(process.env.APP_PORT);

    /** instantiate and start server  */
    new App(port).start();
})();
