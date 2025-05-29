import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import messageReducer from './messageSlice';

import { authApi } from '../services/authApi';
import { channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messageReducer,
    [authApi.reducerPath]: authApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelsApi.middleware)
      .concat(messagesApi.middleware),
});

export default store;