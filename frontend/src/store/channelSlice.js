import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: ['general', 'random'],  // базовые каналы
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    addChannel(state, { payload }) {
      if (!state.channels.includes(payload)) {
        state.channels.push(payload);
      }
    },
  },
});

export const { setChannels, addChannel } = channelsSlice.actions;
export default channelsSlice.reducer;