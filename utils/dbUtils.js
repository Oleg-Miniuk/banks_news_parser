// sort func
const dateTime = require('date-time');

const get5LastNews = async () => {
  const collection = global.db.collection('news');
  const news = await collection
    .find({})
    .limit(5)
    .sort({ $natural: -1 })
    .toArray();
  return news;
};

const checkNewsWasParsed = async (newsObject = {}) => {
  try {
    const { id, title, link, bankName } = newsObject;
    const newsCollection = global.db.collection('news');
    const news = await newsCollection.find({ _id: id }).toArray();
    if (news.length) {
      return true;
    }
    await newsCollection.insertOne({ _id: id, title, date: dateTime(), link, bankName });
    return false;
  } catch (error) {
    console.log(`error: ${error}`);
  }
  return false;
};

module.exports = { get5LastNews, checkNewsWasParsed };
