const puppeteer = require('puppeteer');

const url = 'http://eskhata.com/';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  const result = await page.evaluate(
    () => document.querySelectorAll('.news-item-wrap')[0].textContent
  );
  console.log(result);
})();
