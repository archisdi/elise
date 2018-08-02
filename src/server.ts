import env from 'dotenv';
env.config();

import app from './app';

const port: number | string = process.env.APP_PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app is running at http://127.0.0.1:${port}`);
});

export default server;
