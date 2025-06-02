import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Channels from '../components/Channel.jsx';
import Messages from '../components/Messages.jsx';
import { addMessage } from '../store/messagesSlice.js';
import { addChannels, removeChannels, renameChannels } from '../store/channelsSlice.js';
import socket from '../util/socket.js';


const ChatPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      const handleNewMessage = (message) => {
        console.log('message add socket:' , message)
        dispatch(addMessage(message));
      };
    
      socket.on('newMessage', handleNewMessage);

      const handleNewChannel = (channels) => {
        console.log('channels add socket:' , channels)
        dispatch(addChannels(channels));
      };

      socket.on('newChannel', handleNewChannel);

      const handleRemoveChannel = (channels) => {
        console.log('channels remove socket:' , channels)
        dispatch(removeChannels(channels.id));
      };

      socket.on('removeChannel', handleRemoveChannel);

      const handleRenameChannel = (channels) => {
        console.log('channels rename socket:' , channels)
        dispatch(renameChannels(channels));
      };

      socket.on('renameChannel', handleRenameChannel);
    
      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('newChannel', handleNewChannel);
        socket.off('removeChannel', handleRemoveChannel);
        socket.off('renameChannel', handleRenameChannel);
      };
    }, [dispatch]);

  return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
  )
}

export default ChatPage