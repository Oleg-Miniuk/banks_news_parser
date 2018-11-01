const initErrorHandler = require('./initErrorHandler');
const initLogger = require('./initLogger');
const initParsers = require('./initParsers');
const initRoutes = require('./initRoutes');
const allowCORS = require('./allowCORS');

module.exports = {
  initErrorHandler,
  initLogger,
  initParsers,
  initRoutes,
  allowCORS
};
