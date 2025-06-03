import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './store/index.js'
import socket from './util/socket.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

    const rollbarConfig = {
      accessToken: 'eea9580c95cd4eb4a736241eb270f904',
      environment: 'testenv',
    };

  return (
    <RollbarProvider instance={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={ store }>
          <I18nextProvider i18n={i18n}>
            <App socket={socket} />
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;