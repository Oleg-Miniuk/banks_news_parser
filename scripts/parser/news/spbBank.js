const banksConfig = require('../../../config/banksConfig');
const parserUtils = require('../../../utils/parserUtils');

const {
  spbBank: { url, bankId, bankName }
} = banksConfig;

const getDefaultNewsObj = async (newsEl) => {
  const titleStr = await (await newsEl.getProperty('innerText')).jsonValue();
  const title = titleStr.substr(11);
  const linkEl = await newsEl.$('a');
  const link = await (await linkEl.getProperty('href')).jsonValue();
  const id = `${bankId}_${bankName}_${title}`;
  return {
    title,
    link,
    id,
    bankName
  };
};

const getFirstNewsObj = async (newsEl) => {
  const title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  const link = await (await linkEl.getProperty('href')).jsonValue();
  const id = `${bankId}_${bankName}_${title}`;
  return {
    title,
    link,
    id,
    bankName
  };
};

const parser = async () => {
  let freshNews = [];
  let page;
  try {
    page = await global.browser.newPage();

    await page.goto(url, {
      waitUntil: 'networkidle0'
    });
    const mainNewsEl = await page.$('div.content.news h2');
    const mainNewsObj = await getFirstNewsObj(mainNewsEl);

    const olderNewsElements = await page.$$('div.content.news h4');
    const olderNewsList = await Promise.all(olderNewsElements.map(el => getDefaultNewsObj(el)));

    freshNews = await parserUtils.checkNews({
      newsList: [mainNewsObj, ...olderNewsList],
      bankName
    });
  } catch (error) {
    console.error(`ERRRROR IN ${bankName} parser: ${error}`);
  } finally {
    await page.close();
    return freshNews;
  }
};

module.exports = parser;
