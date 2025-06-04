import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Channels from '../components/Channel.jsx';
import Messages from '../components/Messages.jsx';
import { addMessage } from '../store/messagesSlice.js';
import { addChannels, removeChannels, renameChannels } from '../store/channelsSlice.js';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import socket from '../util/socket.js';


const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isError, refetch  } = useGetChannelsQuery();

    useEffect(() => {
      if (isError && error?.status === 401) {
        navigate('/login');
      }
    }, [isError, error, navigate]); 

    useEffect(() => {
      const handleNewMessage = (message) => {
        console.log('message add socket:' , message)
        dispatch(addMessage(message));
      };
    
      socket.on('newMessage', handleNewMessage);

      const handleNewChannel = (channel) => {
        dispatch(addChannels(channel));
        refetch();
      };

      socket.on('newChannel', handleNewChannel);

      const handleRemoveChannel = (channels) => {
        if (id === currentChannelId) {
          const generalChannel = channels.find((channel) => channel.name === 'general');
          if (generalChannel) {
            dispatch(setCurrentChannelId(generalChannel.id));
          }
        }
  
        dispatch(removeChannels(id));
        setTimeout(() => {
          refetch();
        }, 0);
      };

      socket.on('removeChannel', handleRemoveChannel);

      const handleRenameChannel = (channels) => {
        dispatch(renameChannels(channels));
        refetch();
      };

      socket.on('renameChannel', handleRenameChannel);
    
      return () => {
        socket.off('newMessage', handleNewMessage);
        socket.off('newChannel', handleNewChannel);
        socket.off('removeChannel', handleRemoveChannel);
        socket.off('renameChannel', handleRenameChannel);
      };
    }, [dispatch, refetch]);

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