// const TeleBot = require('telebot');
const axios = require('axios');
const { token } = require('../../config/telegramConfig');

const chatId = '@dh_test_channel_1';
const text = 'surprise mazafaka';

// const bot = new TeleBot({
//   token, // Required. Telegram Bot API token.
//   polling: {
//     // Optional. Use polling.
//     interval: 1000, // Optional. How often check updates (in ms).
//     timeout: 0, // Optional. Update polling timeout (0 - short polling).
//     limit: 100, // Optional. Limits the number of updates to be retrieved.
//     retryTimeout: 5000 // Optional. Reconnecting timeout (in ms).
//   },
//   allowedUpdates: []
// });

// bot.on('text', (msg) => {
//   console.log(msg.text);
//   msg.reply.text(msg.text);
// });

// bot.start();

axios
  .get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
  .then((response) => {
    // handle success
    console.log(response.data);
  })
  .catch(err => console.log(err));
