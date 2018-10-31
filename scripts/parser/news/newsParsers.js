const bank821 = require('./bank821');
const spbBank = require('./spbBank');
const eskhata = require('./eskhata');

// const parsers = [spbBank];
const parsers = [eskhata];
// const parsers = [eskhata, spbBank];

module.exports = parsers;
