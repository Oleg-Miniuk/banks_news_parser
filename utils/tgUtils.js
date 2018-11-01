const axios = require('axios');
const dbUtils = require('./dbUtils');

const { token, chatId } = require('../config/telegramConfig');

const sendTgMessage = async msg => axios
  .get(
    `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(
      msg
    )}&parse_mode= html`
  )
  .then((response) => {
    console.log(response.data);
  })
  .catch(err => console.log(err));

const sendLast5News = async () => {
  const news = await dbUtils.get5LastNews();
  Promise.all(
    news.map(async (newsEl) => {
      const { title, bankName, link } = newsEl;
      const msg = `${bankName}:
    ${title}
    Подробнее: ${link}`;
      return sendTgMessage(msg);
    })
  );
};

module.exports = { sendTgMessage, sendLast5News };
