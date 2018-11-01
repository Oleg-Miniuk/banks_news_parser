const express = require('express');

const app = express();

const {
  initErrorHandler,
  initLogger,
  initParsers,
  initRoutes,
  allowCORS
} = require('./middlewares/index');

initLogger(app);
initParsers(app);
allowCORS(app);
initRoutes(app);
initErrorHandler(app);

module.exports = app;
