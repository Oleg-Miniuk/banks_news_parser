const puppeteer = require('puppeteer');
const banksConfig = require('../../config/banksConfig');
const db = require('../../utils/db');

const {
  spbBank: { url, bankId }
} = banksConfig;

const newsArray = [];

const getDefaultNewsObj = async newsEl => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  const dateEl = await newsEl.$('span');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.date = await (await dateEl.getProperty('innerText')).jsonValue();
  result.id = `${result.date}_${result.title}`;
  return result;
};

const getFirstNewsObj = async (dateEl, newsEl) => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.date = await (await dateEl.getProperty('innerText')).jsonValue();
  result.id = `${result.date}_${result.title}`;
  return result;
};

// TODO make main script from this function
(async () => {
  const browser = await puppeteer.launch();
  console.log('browser launched');
  const page = await browser.newPage();

  await page.goto(url);

  const newsBlock = await page.$('div.content.news');

  const mainNewsDateEl = await page.$('span.badge.badge-info');
  const mainNewsEl = await newsBlock.$('h2');
  const mainNewsObj = await getFirstNewsObj(mainNewsDateEl, mainNewsEl);

  const notificationsList = [];

  // TODO check the first news in db. If missed, get and check the others
  if (await db.checkNewsWasParsed(null, bankId, mainNewsObj)) {
    console.log('exist');
  } else {
    notificationsList.push(mainNewsObj);

    const olderNewsList = await newsBlock.$$('h4');

    for (const el of olderNewsList) {
      const newsObj = await getDefaultNewsObj(el);
      // TODO check in db
      if (await db.checkNewsWasParsed(null, bankId, newsObj)) {
        console.log('gotcha');
        break;
      } else {
        console.log('run away');
        notificationsList.push(newsObj);
      }
    }
  }

  debugger;
  await browser.close();
})();
