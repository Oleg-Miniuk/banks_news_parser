const puppeteer = require('puppeteer'); // const config = require('../../config/banksConfig');
const { MongoClient } = require('mongodb');
const path = require('path');
const dateTime = require('date-time');
const newsParsers = require('./news/newsParsers');
const appConfig = require('../../config/appConfig');
const parserUtils = require('../../utils/parserUtils');

const {
  db: { url, dbName }
} = appConfig;

(async () => {
  try {
    const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    console.log('browser launched');

    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);

    const log = require('simple-node-logger').createSimpleLogger({
      logFilePath: path.join(
        __dirname,
        '../../logs',
        `${dateTime()
          .replace(/\s/g, '_')
          .replace(/:/, '-')}.log`
      )
    });

    Object.assign(global, {
      browser,
      log,
      db
    });

    const results = await Promise.all(newsParsers.map(parser => parser()));
    const notificationList = results.reduce((accum, prevArr) => [...accum, ...prevArr], []);

    client.close();
    await browser.close();
    // parserUtils.notifySubscribers(notificationList);
  } catch (error) {
    console.log(error);
  }
})();
