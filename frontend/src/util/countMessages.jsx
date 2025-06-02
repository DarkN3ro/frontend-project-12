import React from 'react';
import i18next from './i18n.js';

const getMessages = (count) => {
  const n = Math.abs(count);
  const lastTwo = n % 100;
  const lastDigit = n % 10;

  if (lastTwo >= 11 && lastTwo <= 14) {
    return <>{i18next.t('count.manyMessages')}</>;
  }
  if (lastDigit === 1) {
    return <>{i18next.t('count.oneMessage')}</>;
  }
  if (lastDigit >= 2 && lastDigit <= 4) {
    return <>{i18next.t('count.fewMessages')}</>;
  }
  return <>{i18next.t('count.manyMessages')}</>;
};

export default getMessages;