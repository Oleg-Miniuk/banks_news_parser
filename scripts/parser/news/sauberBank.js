const banksConfig = require('../../../config/banksConfig');
const parserUtils = require('../../../utils/parserUtils');

const {
  sauberBank: { url, bankId, bankName }
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
  const page = await global.browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle0'
  });
  const newsBlocks = await page.$$('.news-list2');
  const newsElementsMultiDimensionArr = await Promise.all(newsBlocks.map(async el => el.$$('li')));
  const newsElements = newsElementsMultiDimensionArr.reduce(
    (accum, prevArr) => [...accum, ...prevArr],
    []
  );
  const newsList = await Promise.all(newsElements.map(el => getNewsObj(el)));
  const freshNews = await parserUtils.checkNews({
    newsList,
    bankName
  });
  await page.close();
  return freshNews;
};

module.exports = parser;
