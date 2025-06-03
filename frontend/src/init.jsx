import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import App from './components/App.jsx';
import resources from './locales/index.js';
import { Provider } from 'react-redux';
import store from './store/index.js'
import socket from './util/socket.js';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Rollbar from 'rollbar';

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

    const rollbarInstance = new Rollbar({
      accessToken: 'e44e206c6ebe45b9ab678043a2f3fa9c',
      captureUncaught: true,
      captureUnhandledRejections: true,
      environment: 'production'
    });

  return (
    <RollbarProvider instance={rollbarInstance}>
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