const banksConfig = require('../../../config/banksConfig');
const parserUtils = require('../../../utils/parserUtils');

const {
  bankRossiya: { url, bankId, bankName }
} = banksConfig;

const getNewsObj = async (newsEl) => {
  const linkEl = await newsEl.$('a');
  const title = await (await linkEl.getProperty('innerText')).jsonValue();
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
    const newsElements = await page.$$('.one-news');
    const newsList = await Promise.all(newsElements.map(el => getNewsObj(el)));

    freshNews = await parserUtils.checkNews({
      newsList,
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
