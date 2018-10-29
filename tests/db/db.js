const MongoClient = require('mongodb').MongoClient;
const appConfig = require('../../config/appConfig');

// const {
//   db: { url, dbName }
// } = appConfig;

// (async () => {
//   const mongoClient = new MongoClient(url);
//   let db;
//   mongoClient.connect((err, client) => {
//     if (err) {
//       console.log(err);
//     }
//     db = client.db(dbName);
//     db.listCollections((...props) => console.log(props));
//   });
// })();

const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'b-n_1';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  console.log('Connected successfully to server');

  const db = client.db(dbName);
  const newsCollection = db.collection('news');
  newsCollection.find({}).toArray((error, news) => {
    console.log(news);
    client.close();
  });
});
