const axios = require('axios');

const { token, chatId } = require('../config/telegramConfig');

const sendTgMessage = async msg => axios
  .get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${msg}`)
  .then((response) => {
    console.log(response.data);
  })
  .catch(err => console.log(err));

module.exports = { sendTgMessage };
