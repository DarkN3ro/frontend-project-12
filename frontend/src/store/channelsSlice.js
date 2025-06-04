import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [], 
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
    addChannels(state, { payload }) {
      const exists = state.channels.some(channel => channel.id === payload.id);
      if (!exists) {
        state.channels.push(payload);
      }
    },
    removeChannels(state, { payload }) {
      state.channels = state.channels.filter(channel => channel.id !== payload);
    },
    renameChannels(state, { payload }) {
      const { id, name } = payload;
      const channel = state.channels.find(channel => channel.id === id);
      if (channel) {
        channel.name = name;
      }
    }
  },
});

export const { setChannels, addChannels, setCurrentChannelId, removeChannels, renameChannels } = channelsSlice.actions;
export default channelsSlice.reducer;