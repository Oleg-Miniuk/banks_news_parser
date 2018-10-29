const MongoClient = require('mongodb').MongoClient;
const appConfig = require('../config/appConfig');

// const dbNewsMock = [
//   {
//     id: '24.10.2018_24.10.2018 Изменение списка банков-партнеров с 01.11.2018',
//     bankId: 'SPB_BANK'
//   }
// ];

// const checkNewsWasParsed = async (userNumber, bankId, newsObject) => {
//   const result = dbNewsMock.some(
//     item => item.id === newsObject.id && item.bankId === bankId
//     );
//     return result;
//   };

const {
  db: { url, dbName }
} = appConfig;

const checkNewsWasParsed = async (
  userNumber,
  bankId,
  { id, title, date, link } = {}
) => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const newsCollection = db.collection('news');
    const news = await newsCollection.find({ _id: id }).toArray();
    console.log(news);
    if (news.length) {
      client.close();
      return true;
    }
    await newsCollection.insertOne({ _id: id, title, date, link });
    client.close();
    return false;
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

module.exports = { checkNewsWasParsed };
