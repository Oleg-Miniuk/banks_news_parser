const banksConfig = require('../../../config/banksConfig');
const parserUtils = require('../../../utils/parserUtils');

const {
  bank821: { url, bankId, bankName }
} = banksConfig;

const getDefaultNewsObj = async (newsEl) => {
  const result = {};
  const titleStr = await (await newsEl.getProperty('innerText')).jsonValue();
  result.title = titleStr.substr(11);
  const linkEl = await newsEl.$('a');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.id = `${bankId}_${bankName}_${result.title}`;
  return result;
};

const getFirstNewsObj = async (newsEl) => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  result.id = `${bankId}_${bankName}_${result.title}`;
  return result;
};

const parser = async () => {
  const page = await global.browser.newPage();

  await page.goto(url);

  const mainNewsEl = await page.$('div.content.news h2');
  const mainNewsObj = await getFirstNewsObj(mainNewsEl);

  const olderNewsElements = await page.$$('div.content.news h4');
  const olderNewsList = await Promise.all(olderNewsElements.map(el => getDefaultNewsObj(el)));

  const freshNews = await parserUtils.checkNews({
    newsList: [mainNewsObj, ...olderNewsList],
    bankName
  });

  await page.close();

  return freshNews;
};

module.exports = parser;
