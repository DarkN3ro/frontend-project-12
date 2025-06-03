import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './store/index.js'
import socket from './util/socket.js';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <Provider store={ store }>
      <I18nextProvider i18n={i18n}>
        <App socket={socket} />
      </I18nextProvider>
    </Provider>
  );
};

export default init;