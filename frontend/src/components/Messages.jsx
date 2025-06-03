import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../util/useAuth.js';
import { useGetMessagesQuery, useSendMessageMutation } from '../services/messagesApi.js';
import { setMessages, combineMessages } from '../store/messagesSlice.js';
import { BsArrowRightSquare  } from "react-icons/bs";
import countMessages from '../util/countMessages.jsx';
import i18next from '../util/i18n.js';
import { toast } from 'react-toastify';

const Messages = () => {
 
  const dispatch = useDispatch();
  const { username } = useAuth()
  const [newMessage, setNewMessage] = useState('');
  const { data: initialMessages  = []} = useGetMessagesQuery();

  const messages = useSelector(state => state.messages);
  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);

  const currentChannel = channels.find(ch => ch.id === currentChannelId);
  const currentChannelName = currentChannel ? currentChannel.name : '';
  
  
  useEffect(() => {
    if (initialMessages.length > 0) {
      if (messages.length === 0) {
        dispatch(setMessages(initialMessages));
      } else {
        dispatch(combineMessages(initialMessages));
      }
    }
  }, [ initialMessages, dispatch, messages.length]);

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

    try {
      await sendMessage(messageToSend).unwrap();
      setNewMessage('');
    } catch (error) {
      toast.error(i18next.t('alertErrors.messageSendError'));
    }
  };

  const filteredMessages = messages.filter(msg => msg.channelId === currentChannelId);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
  
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannelName}</b></p>
          <span className="text-muted">{filteredMessages.length} {countMessages(filteredMessages.length)}</span>
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
                aria-label={i18next.t('messages.newMessage')}
                placeholder={i18next.t('messages.sendNewMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit" className="btn btn-group-vertical">
                <BsArrowRightSquare size={20} color="currentColor" />
                <span className="visually-hidden">{i18next.t('messages.signupMessages')}</span>
              </button>
            </div>
          </form>
        </div>
  
      </div>
    </div>
  );
}

export default Messages