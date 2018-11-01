const TeleBot = require('telebot');
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

bot.on(
  'text',
  msg => msg.reply.text(`${msg.text} \nDick`)
  // bot.sendMessage(msg.from.id, 'Dick');
);
bot.start();
// _______________________END OF TELEGRAM BOT_________________________
