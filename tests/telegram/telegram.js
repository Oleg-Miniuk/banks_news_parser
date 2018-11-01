const TeleBot = require('telebot');
// const axios = require('axios');
const { token } = require('../../config/telegramConfig');

// const chatId = '@dh_test_channel_1';
// const text = 'surprise mazafaka';

// _______________________TELEGRAM BOT_________________________
const bot = new TeleBot({
  token, // Required. Telegram Bot API token.
  polling: {
    // Optional. Use polling.
    interval: 1000, // Optional. How often check updates (in ms).
    timeout: 0, // Optional. Update polling timeout (0 - short polling).
    limit: 100, // Optional. Limits the number of updates to be retrieved.
    retryTimeout: 5000 // Optional. Reconnecting timeout (in ms).
  },
  allowedUpdates: []
});

bot.on('text', msg => msg.reply.text(`${msg.text} \nDick`)
  // bot.sendMessage(msg.from.id, 'Dick');
);
bot.start();
// _______________________END OF TELEGRAM BOT_________________________

// _______________________CHANNEL_________________________
// axios
//   .get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
//   .then((response) => {
//     // handle success
//     console.log(response.data);
//   })
//   .catch(err => console.log(err));
// RESPONSE DATA
// {
//   ok: true,
//     result:
//   {
//     message_id: 3,
//       chat:
//     {
//       id: -1001362312949,
//         title: 'DH_test_channel/1',
//           username: 'dh_test_channel_1',
//             type: 'channel'
//     },
//     date: 1540983504,
//       text: 'surprise mazafaka'
//   }
// }
// END OF RESPONSE DATA
// _______________________END OF CHANNEL_________________________
