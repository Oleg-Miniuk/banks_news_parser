const banksConfig = require('../../../config/banksConfig');
const parserUtils = require('../../../utils/parserUtils');

const { eskhata } = banksConfig;

const getNewsList = async page => page.evaluate((eskhataInfo) => {
  const { bankId, bankName } = eskhataInfo;
  const getNewsObject = (node) => {
    const title = node.querySelector('.eb-news-body').textContent.trim();

    const link = node
      .querySelector('.eb-news-body')
      .querySelectorAll('a')[1]
      .href.trim();

    const id = `${bankId}_${bankName}_${title}`;
    return {
      title,
      id,
      link
    };
  };
  const nodes = document
    .querySelector('.news-list.eb-block-wrap')
    .querySelectorAll('.news-item-wrap');

  const news = Array.from(nodes).map(node => getNewsObject(node));
  return news;
}, eskhata);

const parser = async () => {
  const page = await global.browser.newPage();

  await page.goto(eskhata.url);
  const newsList = await getNewsList(page);

  const freshNews = await parserUtils.checkNews({
    newsList,
    bankName: eskhata.bankName
  });

  await page.close();

  return freshNews;
};

module.exports = parser;
