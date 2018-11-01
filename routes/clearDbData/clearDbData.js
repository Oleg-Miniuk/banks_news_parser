const express = require('express');
const { MongoClient } = require('mongodb');
const appConfig = require('../../config/appConfig');

const router = express.Router();

const {
  db: { url, dbName }
} = appConfig;

router.get('/', async (req, res) => {
  const client = new MongoClient(url, { useNewUrlParser: true });
  await client.connect();
  const db = client.db(dbName);
  const newsCollection = db.collection('news');
  await newsCollection.remove({ bankName: 'Банк Россия' });
  res.end();
});

module.exports = router;
