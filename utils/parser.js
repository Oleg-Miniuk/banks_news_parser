const logNews = (bankName, newsObj) => {
  const { date, title } = newsObj;
  global.log.info(bankName, ', ', 'date: ', date, ', ', 'title: ', title);
};

module.exports = {
  logNews
};
