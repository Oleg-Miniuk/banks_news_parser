const MongoClient = require('mongodb').MongoClient;
const appConfig = require('../../config/appConfig');

const {
  db: { url, dbName }
} = appConfig;

(async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    const newsCollection = db.collection('news');
    const news = await newsCollection.find({}).toArray();
    console.log(news);
    client.close();
  } catch (error) {
    console.log(`error: ${error}`);
  }
})();
