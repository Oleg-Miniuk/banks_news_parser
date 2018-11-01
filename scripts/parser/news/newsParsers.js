const bank821 = require('./bank821');
const spbBank = require('./spbBank');
const eskhata = require('./eskhata');
// const imon = require('./imon');
const bankRossiya = require('./bankRossiya');
const sauberBank = require('./sauberBank');
const gorBank = require('./gorBank');

// const parsers = [bank821, gorBank, spbBank, eskhata, imon, bankRossiya, sauberBank];

const parsers = [bank821, gorBank, spbBank, eskhata, bankRossiya, sauberBank];

module.exports = parsers;
