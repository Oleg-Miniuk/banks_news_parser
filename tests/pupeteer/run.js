const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  console.log('browser launched');
  Object.assign(global, { browser });
})();
