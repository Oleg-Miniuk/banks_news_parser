const test = require('../routes/test/test');

const initRoutes = app => {
  app.use(`/`, test);
};

module.exports = initRoutes;
