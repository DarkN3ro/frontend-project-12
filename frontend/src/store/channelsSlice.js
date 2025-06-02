import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: ['general', 'random'],  // базовые каналы
  currentChannelId: '',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    addChannels(state, { payload }) {
      if (!state.channels.includes(payload)) {
        state.channels.push(payload);
      }
    },
    setCurrentChannelId(state, { payload }) {
      state.currentChannelId = payload;
    },
    removeChannels(state, { payload }) {
      state.channels = state.channels.filter(channel => channel.id !== payload);
      if (state.currentChannelId === payload) {
        const generalChannel = state.channels.find(ch => ch.name === 'general');
        state.currentChannelId = generalChannel ? generalChannel.id : '';
      }
    }
  },
});

export const { setChannels, addChannels, setCurrentChannelId, removeChannels } = channelsSlice.actions;
export default channelsSlice.reducer;