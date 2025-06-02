import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../util/useAuth.js';
import { useGetMessagesQuery, useSendMessageMutation } from '../services/messagesApi.js';
import { setMessages, combineMessages } from '../store/messagesSlice.js';
import { BsArrowRightSquare  } from "react-icons/bs";

const Messages = () => {
 
  const dispatch = useDispatch();
  const { username } = useAuth()
  const [newMessage, setNewMessage] = useState('');
  const { data: initialMessages  = [], isLoading, isError, error } = useGetMessagesQuery();

  const messages = useSelector(state => state.messages);
  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);

  const currentChannel = channels.find(ch => ch.id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : '';
  
  
  useEffect(() => {
    console.log('useEffect triggered:', { isLoading, isError, initialMessages });
  
    if (isLoading) {
      console.log('Loading messages...');
      return;
    }
  
    if (isError) {
      console.error('Error fetching messages:', error);
      return;
    }
  
    if (initialMessages.length > 0) {
      if (messages.length === 0) {
        console.log('Setting initial messages');
        dispatch(setMessages(initialMessages));
      } else {
        console.log('Combining messages');
        dispatch(combineMessages(initialMessages));
      }
    }
  }, [isLoading, isError, error, initialMessages, dispatch, messages.length]);

  const [sendMessage] = useSendMessageMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitized = newMessage.trim();
    if (!sanitized) return;

    const messageToSend = {
      body: sanitized,
      channelId: currentChannelId,
      username,
    };
    console.log('messageToSend ==> ', messageToSend)

    try {
      const response = await sendMessage(messageToSend).unwrap();
      console.log('Response from sendMessage:', response);
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const filteredMessages = messages.filter(msg => msg.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
  
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannelName}</b></p>
          <span className="text-muted">{filteredMessages.length} messages</span>
        </div>
  
        <div className="flex-grow-1 overflow-auto px-3">
          {filteredMessages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.username || 'user'}</b>
              {': '}
              {msg.body}
            </div>
          ))}
        </div>
  
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" className="btn btn-group-vertical" disabled={isLoading}>
                <BsArrowRightSquare size={20} color="currentColor" />
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
  
      </div>
    </div>
  );
}

export default Messages