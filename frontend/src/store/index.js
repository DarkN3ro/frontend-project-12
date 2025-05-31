import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import messagesReducer from './messagesSlice';
import { authApi } from '../services/authApi';
import { channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
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