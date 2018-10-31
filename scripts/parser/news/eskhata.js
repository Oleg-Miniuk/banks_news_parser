const banksConfig = require('../../../config/banksConfig');
const dbUtils = require('../../../utils/dbUtils');
const parserUtils = require('../../../utils/parserUtils');

const {
  eskhata: eskhataInfo,
  eskhata: { url, bankName }
} = banksConfig;

const getNewsList = async (page) => {
  const listNewsElements = await page.evaluate((eskhataInfo) => {
    const { url, bankId, bankName } = eskhataInfo;
    const getNewsObject = (node) => {
      const title = node.querySelector('.eb-news-body').textContent.trim();

      const link = node
        .querySelector('.eb-news-body')
        .querySelectorAll('a')[1]
        .href.trim();

      const day = node.querySelector('.eb-news-day').textContent.trim();
      const month = node.querySelector('.eb-news-month').textContent.trim();
      const year = node.querySelector('.eb-news-year').textContent.trim();
      const date = `${day} ${month} ${year}`;

      const id = `${bankId}_${date}_${title}`;
      return {
        title,
        id,
        date,
        link
      };
    };
    const nodes = document
      .querySelector('.news-list.eb-block-wrap')
      .querySelectorAll('.news-item-wrap');

    const nodeArr = Array.from(nodes);
    const news = nodeArr.map(node => getNewsObject(node));
    return news;
  }, eskhataInfo);
  console.log(listNewsElements);
};

const parser = async () => {
  const page = await global.browser.newPage();

  await page.goto(url);
  const freshNews = [];

  await getNewsList(page);

  await page.close();

  return freshNews;
};

module.exports = parser;
