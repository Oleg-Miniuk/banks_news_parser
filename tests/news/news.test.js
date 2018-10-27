const axios = require('axios');

const url = 'https://www.bspb.ru/news/';

test('getting SPB-bank news', async () => {
  const resp = await axios.get(url);
  console.log(resp);
  expect(resp.status).toBe(200);
});
