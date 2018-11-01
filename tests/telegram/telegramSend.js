const axios = require('axios');
const { token, chatId } = require('../../config/telegramConfig');

const text = 'hello world';

axios
  .get(`https://api.telegram.org/bot${token}/sendMessage?chat_id=${chatId}&text=${text}`)
  .then((response) => {
    // handle success
    console.log(response.data);
  })
  .catch(err => console.log(err));
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
