import i18next from 'i18next';
import ru from '../locales/ru'

i18next.init({
  lng: 'ru',
  resources: {
    ru,
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;