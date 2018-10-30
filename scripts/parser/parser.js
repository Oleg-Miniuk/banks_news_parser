const puppeteer = require('puppeteer'); // const config = require('../../config/banksConfig');
const { MongoClient } = require('mongodb');
const path = require('path');
const newsParsers = require('./news/newsParsers');
const appConfig = require('../../config/appConfig');

const {
  db: { url, dbName }
} = appConfig;

(async () => {
  try {
    const browser = await puppeteer.launch();
    console.log('browser launched');

    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    const db = client.db(dbName);

    const log = require('simple-node-logger').createSimpleLogger({
      logFilePath: path.join(__dirname, '../../logs', `${new Date().toJSON()}.log`)
    });

    const results = await Promise.all(newsParsers.map(parser => parser(browser, db)));
    client.close();
    await browser.close();
    console.log(results);
  } catch (error) {
    console.log(error);
  }
})();
