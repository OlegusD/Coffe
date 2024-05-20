const routes = require('./routes');

const config = {
  migrate: false,
  routes,
  port: process.env.PORT || '3333',
};

module.exports = config;
