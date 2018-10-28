const dbNewsMock = [
  {
    id: '24.10.2018_24.10.2018 Изменение списка банков-партнеров с 01.11.2018',
    bankId: 'SPB_BANK'
  }
];

const checkNewsWasParsed = async (userNumber, bankId, newsObject) => {
  const result = dbNewsMock.some(
    item => item.id === newsObject.id && item.bankId === bankId
  );
  return result;
};

module.exports = { checkNewsWasParsed };
