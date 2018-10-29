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

const connectToDb = async () => {
  // const client = new MongoClient(url);
  // let db;
  // await client.connect();
  // db = client.db(dbName);
  // const collections = await db.collections();
  // return collections;

  const mongoClient = new MongoClient(url);
  let db;
  mongoClient.connect((err, client) => {
    if (err) {
      console.log(err);
    }
    db = client.db(dbName);
    db.listCollections((...props) => console.log(props));
  });
};

const checkNewsWasParsed = async (userNumber, bankId, newsObject) => {
  const collections = await connectToDb();
  return false;
};

module.exports = { checkNewsWasParsed };
