import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, action) {
      return action.payload;
    },
    addMessage(state, action) {
      state.push(action.payload);
    },
    combineMessages(state, action) {
        const newMessages = action.payload;
        newMessages.forEach(msg => {
          if (!state.find(m => m.id === msg.id)) {
            state.push(msg);
          }
        });
      },
  },
});

export const { setMessages, addMessage, combineMessages } = messagesSlice.actions;
export default messagesSlice.reducer;