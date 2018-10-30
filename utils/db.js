const checkNewsWasParsed = async (db, bankId, { id, title, date, link } = {}) => {
  try {
    const newsCollection = db.collection('news');
    const news = await newsCollection.find({ _id: id }).toArray();
    console.log(news);
    if (news.length) {
      return true;
    }
    await newsCollection.insertOne({ _id: id, title, date, link });
    return false;
  } catch (error) {
    console.log(`error: ${error}`);
  }
  return false;
};

module.exports = { checkNewsWasParsed };
