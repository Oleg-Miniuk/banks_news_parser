/* eslint no-unused-vars: 0  */

const puppeteer = require('puppeteer'); // const config = require('../../config/banksConfig');
const { MongoClient } = require('mongodb');
const path = require('path');
const dateTime = require('date-time');
const logger = require('simple-node-logger');
const schedule = require('node-schedule');

const newsParsers = require('./news/newsParsers');
const appConfig = require('../../config/appConfig');
const parserUtils = require('../../utils/parserUtils');

const {
  db: { url, dbName }
} = appConfig;

const memoryLog = logger.createSimpleLogger({
  logFilePath: path.join(
    __dirname,
    '../../logs',
    `MEMORY_LOG_${dateTime()
      .replace(/\s/g, '_')
      .replace(/:/, '-')}.log`
  )
});

const rule = new schedule.RecurrenceRule();
// rule.hour = [new schedule.Range(0, 23)];
rule.minute = [new schedule.Range(0, 59, 2)];

const j = schedule.scheduleJob(rule, async () => {
  memoryLog.info('memory used: ', global.process.memoryUsage().heapUsed);

  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  console.log('browser launched');
  console.log(process.env.TELEGRAM);

  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  const db = client.db(dbName);

  try {
    const log = logger.createSimpleLogger({
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

    const results = await Promise.all(newsParsers.map(parser => parser())).catch(err => console.log(`GOTCHA ${err})`)
    );
    const notificationList = results.length
      ? results.reduce((accum, prevArr) => [...accum, ...prevArr], [])
      : null;

    if (notificationList && notificationList.length && process.env.TELEGRAM) {
      parserUtils.notifySubscribers(notificationList);
    }
    console.log('ended');
  } catch (error) {
    console.log(`ERROR IN MAIN PARSER: ${error}`);
  } finally {
    client.close();
    await browser.close();
  }
});
