import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
  currentChannel: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
  },
});

export const { setChannels, setCurrentChannel } = channelsSlice.actions;
export default channelsSlice.reducer;