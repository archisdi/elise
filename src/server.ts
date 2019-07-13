
import App from './app';
import * as env from 'dotenv';

/**  */
(async () => {
    await env.config();

    const app = new App();
    app.start(Number(process.env.APP_PORT) || 3000);
})();
