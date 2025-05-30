import Channels from '../components/Channel';
import Messages from '../components/Messages';
import { useAuth } from '../util/useAuth';

const ChatPage = () => {
    const { token, username } = useAuth();
  return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages token={token} username={username} />
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