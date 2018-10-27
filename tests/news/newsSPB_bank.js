const puppeteer = require('puppeteer');

const url = 'https://www.bspb.ru/news/';

const newsArray = [];

const getNewsObject = async newsEl => {
  const result = {};
  result.title = await (await newsEl.getProperty('innerText')).jsonValue();
  const linkEl = await newsEl.$('a');
  result.link = await (await linkEl.getProperty('href')).jsonValue();
  return result;
};

(async () => {
  const browser = await puppeteer.launch();
  console.log('browser launched');
  const page = await browser.newPage();

  Object.assign(global, { browser, page });

  await page.goto(url);

  const newsBlock = await page.$('div.content.news');
  const mainNewsEl = await newsBlock.$('h2');
  const mainNewsObj = await getNewsObject(mainNewsEl);

  // TODO check in db

  const olderNewsList = await newsBlock.$$('h4');

  const stopTitile =
    '24.10.2018 Уведомление о закрытии дополнительного офиса «Охтинский»';
  for (const el of olderNewsList) {
    const newsObj = await getNewsObject(el);
    if (newsObj.title == stopTitile) {
      console.log('gotch');
      break;
    } else {
      console.log('run away');
    }
  }

  debugger;
  await browser.close();
})();
