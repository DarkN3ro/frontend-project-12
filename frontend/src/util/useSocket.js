import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../store/messagesSlice';
import { addChannels, removeChannels, renameChannels } from '../store/channelsSlice';
import socket from './socket';

const useSocket = (refetch) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socketEvents = [
      ['newMessage', (msg) => dispatch(addMessage(msg))],
      ['newChannel', (channel) => {
        dispatch(addChannels(channel));
        refetch();
      }],
      ['removeChannel', (channel) => {
        dispatch(removeChannels(channel.id));
        refetch();
      }],
      ['renameChannel', (channel) => {
        dispatch(renameChannels(channel));
        refetch();
      }],
    ];

    socketEvents.forEach(([event, handler]) => socket.on(event, handler));

    return () => {
      socketEvents.forEach(([event, handler]) => socket.off(event, handler));
    };
  }, [dispatch, refetch]);
};

export default useSocket;
