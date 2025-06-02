import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import modalsReducer from './modalsSlice.js';
import { authApi } from '../services/authApi.js';
import { channelsApi } from '../services/channelsApi.js';
import { messagesApi } from '../services/messagesApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(messagesApi.middleware)
    .concat(channelsApi.middleware)

});

export default store;