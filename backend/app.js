require('dotenv').config();

/**
 * third party libraries
 */
//const bodyParser = require('body-parser');
const http = require('http');

/**
 * express app and routes. API v1
 */
const app = require('./routes/v1');

/**
 * server configuration
 */
const config = require('./config/');

// environment: development, staging, testing, production
process.env.NODE_ENV = 'development';

const environment = process.env.NODE_ENV;

const server = http.Server(app);

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  //return DB;
});
