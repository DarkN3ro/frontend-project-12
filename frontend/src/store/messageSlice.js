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
    addMessageToChannel(state, { payload }) {
      const { channel, message } = payload;
      if (!state.messagesByChannel[channel]) {
        state.messagesByChannel[channel] = [];
      }
      state.messagesByChannel[channel].push(message);
    },
  },
});

export const { addMessageToChannel } = messageSlice.actions;
export default messageSlice.reducer;