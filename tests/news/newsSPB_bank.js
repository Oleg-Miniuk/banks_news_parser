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

  const mainNewsResult = await getNewsObject(mainNewsEl);

  // const mainNews = await (await newsBlock.$$('h2')).jsonValue();

  // const newsList = await (await newsBlock.$$('h4')).jsonValue();

  // const randomElText = await h4s[1].getProperty('innerText');
  // const randomTitile = await randomElText.jsonValue();
  console.log(mainNewsResult);
  debugger;
  await browser.close();
})();
