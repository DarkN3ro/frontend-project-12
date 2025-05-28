import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice';
import messageReducer from './messageSlice';

import { authApi } from '../services/authApi';
import { channelApi } from '../services/channelApi';
import { messageApi } from '../services/messageApi';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messageReducer,
    [authApi.reducerPath]: authApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
    [channelApi.reducerPath]: channelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(channelApi.middleware)
      .concat(messageApi.middleware),
});

export default store;