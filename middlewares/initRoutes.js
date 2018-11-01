const clearDbData = require('../routes/clearDbData/clearDbData');

const initRoutes = (app) => {
  app.use('/clear_data', clearDbData);
};

module.exports = initRoutes;
