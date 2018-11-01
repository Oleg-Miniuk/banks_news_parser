const logger = require('morgan');

const initLogger = app => {
  app.use(logger('dev'));
};

module.exports = initLogger;
