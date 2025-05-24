import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice.js';
import messagesReducer from './messageSlice.js';
import channelsReducer from './channelSlice.js';

export default configureStore({
    reducer: {
      auth: authReducer,
      messages: messagesReducer,
      channels: channelsReducer,
    },
  });