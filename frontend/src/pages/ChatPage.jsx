import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Channels from '../components/Channel.jsx';
import Messages from '../components/Messages.jsx';
import { addMessage } from '../store/messagesSlice.js';
import { addChannels, removeChannels } from '../store/channelsSlice.js';
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

      const handleRemoveChannel = (channel) => {
        console.log('channels remove socket:' , channel)
        dispatch(removeChannels(channel.id));
      };

      socket.on('removeChannel', handleRemoveChannel);
    
      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('newChannel', handleNewChannel);
        socket.off('removeChannel', handleRemoveChannel);
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