import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messagesByChannel: {
    general: [],
    random: [],
  },
};

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessagesForChannel: (state, action) => {
      const { channel, messages } = action.payload;
      state.messagesByChannel[channel] = messages;
    },
    addMessageToChannel(state, { payload }) {
      const { channel, message } = payload;
      if (!state.messagesByChannel[channel]) {
        state.messagesByChannel[channel] = [];
      }
      state.messagesByChannel[channel].push(message);
    },
    removeMessagesByChannel(state, { payload }) {
      delete state.messagesByChannel[payload];
    },
  },

});

export const { addMessageToChannel, setMessagesForChannel } = messageSlice.actions;
export default messageSlice.reducer;