import socket from '../socket.js';
import { dispatch, getState } from '../store/store.js';
import { addChannel, removeChannel, renameChannel, setChannel } from '../store/channelsSlice.js';
import { addMessage, removeMessage } from '../store/messageSlice.js';

const socket = () => {
  socket.on('newChannel', (payload) => {
    dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    const { channels, activeChannel } = getState().channels;
    const { messages } = getState().messages;
    dispatch(removeChannel(payload));
    messages.forEach((message) => dispatch(removeMessage(payload, message)));
    if (payload.id === activeChannel.id) {
      dispatch(setChannel(channels[0]));
    }
  });

  socket.on('renameChannel', (payload) => {
    dispatch(renameChannel(payload));
  });

  socket.on('newMessage', (payload) => {
    dispatch(addMessage(payload));
  });

  return () => {
    socket.off('newChannel');
    socket.off('removeChannel');
    socket.off('renameChannel');
    socket.off('newMessage');
  }
}

export const initSocket = () => {
  return socket();
};