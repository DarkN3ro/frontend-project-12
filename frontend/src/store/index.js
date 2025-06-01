import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import { chatApi } from '../services/chatApi.js';

const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    [chatApi.reducerPath]: chatApi.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(chatApi.middleware)

});

export default store;