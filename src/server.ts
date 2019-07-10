
import App from './app';
import * as env from 'dotenv';

env.config();

new App()
    .start(3000);
