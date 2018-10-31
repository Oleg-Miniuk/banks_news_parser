const dateTime = require('date-time');
const dbUtils = require('./dbUtils');
const tgUtils = require('./tgUtils');

const logNews = ({ bankName, newsObj }) => {
  const { title } = newsObj;
  global.log.info(bankName, ', ', 'date: ', dateTime(), ', ', 'title: ', title);
};

const checkNews = async ({ newsList, bankName }) => {
  const freshNews = [];
  for (const newsObj of newsList) {
    if (await dbUtils.checkNewsWasParsed(newsObj)) {
      break;
    } else {
      logNews({ bankName, newsObj });
      freshNews.push(newsObj);
    }
  }
  if (!freshNews.length) {
    global.log.info(bankName, ', ', 'date: ', dateTime(), ', ', 'no fresh news');
  }
  return freshNews;
};

const notifySubscribers = async (newsList) => {
  for (const newsEl of newsList) {
    const { title, bankName, link } = newsEl;
    const msg = `${bankName}:
    ${title}
    Подробнее: ${link}`;
    await tgUtils.sendTgMessage(msg);
  }
};

module.exports = {
  logNews,
  checkNews,
  notifySubscribers
};
