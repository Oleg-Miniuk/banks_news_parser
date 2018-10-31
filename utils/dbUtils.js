const checkNewsWasParsed = async (newsObject = {}) => {
  try {
    const { id, title, date, link } = newsObject;
    const newsCollection = global.db.collection('news');
    const news = await newsCollection.find({ _id: id }).toArray();
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
