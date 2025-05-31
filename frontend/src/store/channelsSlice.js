import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [
    { id: 1, name: 'general', removable: false },
    { id: 2, name: 'random', removable: false },
  ],
  currentChannelId: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
  },
});

export const { setChannels, setCurrentChannelId } = channelsSlice.actions;
export default channelsSlice.reducer;