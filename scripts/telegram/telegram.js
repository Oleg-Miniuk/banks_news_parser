const TeleBot = require('telebot');
const { token } = require('../../config/telegramConfig');
const dbUtils = require('../../utils/dbUtils');

const bot = new TeleBot({
  token,
  polling: {
    interval: 1000,
    timeout: 0,
    limit: 100,
    retryTimeout: 5000
  },
  allowedUpdates: []
});

bot.on('text', async (msg) => {
  if (msg.text.includes('нового')) {
    const news = await dbUtils.get5LastNews();
    Promise.all(
      news.map(async (newsEl) => {
        const { title, bankName, link } = newsEl;
        const response = `${bankName}:
    ${title}
    Подробнее: ${link}`;
        return bot.sendMessage(response);
      })
    );
  }
});
bot.start();
