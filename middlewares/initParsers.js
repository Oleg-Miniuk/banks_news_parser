const bodyParser = require('body-parser');

const initParsers = app => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
};

module.exports = initParsers;
