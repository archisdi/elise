/**
 * Load Environment
 */
import env from 'dotenv';
env.config();

/**
 * Debugger
 */
import debug from 'debug';
debug('express-ts-api-server');

import app from './app';
import http from 'http';

/**
 * Get port from environment and store in Express.
 */
const port: number | string = process.env.APP_PORT || 3000;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', (error: any) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});

const addr = server.address();
const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
console.log(`server running at ${bind}`);
