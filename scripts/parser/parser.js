const puppeteer = require('puppeteer'); // const config = require('../../config/banksConfig');
const { MongoClient } = require('mongodb');
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

    const results = await Promise.all(newsParsers.map(parser => parser(browser, db)));

    const updateResult = results.reduce(
      (accumulator, curentArr) => [...accumulator, ...curentArr],
      []
    );
    client.close();
    await browser.close();
    console.log(updateResult);
  } catch (error) {
    console.log(error);
  }
})();
