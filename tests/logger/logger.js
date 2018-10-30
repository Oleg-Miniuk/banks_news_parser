const path = require('path');

const log = require('simple-node-logger').createSimpleLogger({
  logFilePath: path.join(__dirname, '../../logs', `${new Date().toJSON()}.log`)
});

const channel = '1 channel';
log.info('subscription to ', channel, ' accepted at ', new Date().toJSON());
