const { MongoClient } = require('mongodb');
const appConfig = require('../../config/appConfig');
const dbUtils = require('../../utils/dbUtils');

const {
  db: { url, dbName }
} = appConfig;

(async () => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  try {
    await client.connect();
    const db = client.db(dbName);
    Object.assign(global, { db });
    const news = await dbUtils.get3LastNews();
    console.log(news);
    client.close();
  } catch (error) {
    console.log(`error: ${error}`);
  }
})();
