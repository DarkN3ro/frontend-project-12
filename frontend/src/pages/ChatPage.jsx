import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Channels from '../components/Channel.jsx';
import Messages from '../components/Messages.jsx';
import { addMessage } from '../store/messagesSlice.js';
import socket from '../util/socket.js';


const ChatPage = () => {
  const dispatch = useDispatch();

    useEffect(() => {
      const handleNewMessage = (message) => {
        dispatch(addMessage(message));
      };
    
      socket.on('newMessage', handleNewMessage);
    
      return () => {
        socket.off('newMessage', handleNewMessage);
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

/*import React from 'react';
import { useAuth } from '../util/useAuth';


const ChatPage = () => {
    const { username } = useAuth();

    return (
        <div>
          <b>Chat</b>
          <h1>Привет, {username}!</h1>
        </div>
    )
}

export default ChatPage 
*/