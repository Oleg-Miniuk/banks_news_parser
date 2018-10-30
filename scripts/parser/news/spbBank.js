const banksConfig = require('../../../config/banksConfig');
const dbUtils = require('../../../utils/db');

const {
  spbBank: { url, bankId }
} = banksConfig;

const getDefaultNewsObj = async (newsEl) => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  const dateEl = await newsEl.$('span');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.date = await (await dateEl.getProperty('innerText')).jsonValue();
  result.id = `${bankId}_${result.date}_${result.title}`;
  return result;
};

const getFirstNewsObj = async (dateEl, newsEl) => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.date = await (await dateEl.getProperty('innerText')).jsonValue();
  result.id = `${bankId}_${result.date}_${result.title}`;
  return result;
};

const parser = async (browser, db) => {
  const page = await browser.newPage();

  await page.goto(url);

  const newsBlock = await page.$('div.content.news');

  const mainNewsDateEl = await page.$('span.badge.badge-info');
  const mainNewsEl = await newsBlock.$('h2');
  const mainNewsObj = await getFirstNewsObj(mainNewsDateEl, mainNewsEl);

  const freshNews = [];

  if (await dbUtils.checkNewsWasParsed(db, bankId, mainNewsObj)) {
    console.log('first news already parsed');
  } else {
    freshNews.push(mainNewsObj);
    const olderNewsList = await newsBlock.$$('h4');
    for (const el of olderNewsList) {
      const newsObj = await getDefaultNewsObj(el);
      if (await dbUtils.checkNewsWasParsed(db, bankId, newsObj)) {
        console.log('already parsed');
        break;
      } else {
        console.log('gotcha!');
        freshNews.push(newsObj);
      }
    }
  }

  await page.close();

  return freshNews;
};

module.exports = parser;
