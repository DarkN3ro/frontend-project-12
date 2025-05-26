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
    removeChannel(state, { payload }) {
      state.channels = state.channels.filter((channel) => channel !== payload);
    },
  },
});

export const { setChannels, addChannel, removeChannel } = channelsSlice.actions;
export default channelsSlice.reducer;