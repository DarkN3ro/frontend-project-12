const countMessages = (count, t) => {
  const n = Math.abs(count);
  const lastTwo = n % 100;
  const lastDigit = n % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return t('count.manyMessages');
  }
  if (lastDigit === 1) {
    return t('count.oneMessage');
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return t('count.fewMessages');
  }
  return t('count.manyMessages');
};

export default countMessages;