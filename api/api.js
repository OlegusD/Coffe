const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const cors = require('cors');
const fileUpload = require('express-fileupload');

/**
 * server configuration
 */
const config = require('../config/');
const dbService = require('./services/db.service');
const environment = process.env.NODE_ENV;
/**
 * express application
 */
const app = express();

const server = http.Server(app);
const mappedRoutes = mapRoutes(config.routes, 'api/controllers/');

const DB = dbService(environment, config.migrate)
  .start();

app.use(cors());

app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(fileUpload());

app.use('/', mappedRoutes);



server.listen(config.port, () => {
  if (environment !== 'development')
  {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});

