import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../util/useAuth.js';
import { useGetMessagesQuery, useSendMessageMutation } from '../services/messagesApi.js';
import { setMessages, combineMessages } from '../store/messagesSlice.js';
import { BsArrowRightSquare  } from "react-icons/bs";
import countMessages from '../util/countMessages.js';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import filter from '../util/profanity.js';

const Messages = () => {
  const dispatch = useDispatch();
  const messagesBoxRef = useRef(null);
  const messageInputRef = useRef(null);
  const { t } = useTranslation();
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

    const trimmed = newMessage.trim();
    if (!trimmed) return;

    const sanitized = filter.clean(trimmed)

    const messageToSend = {
      body: sanitized,
      channelId: currentChannelId,
      username,
    };

    try {
      await sendMessage(messageToSend).unwrap();
      setNewMessage('');
      messageInputRef.current.focus();
    } catch (error) {
      toast.error(t('alertErrors.messageSendError'));
    }
  };
  

  const filteredMessages = messages.filter(msg => msg.channelId === currentChannelId);

  useEffect(() => {
    if (messagesBoxRef.current) {
      messagesBoxRef.current.scrollTop = messagesBoxRef.current.scrollHeight;
    }
  }, [filteredMessages]);

  useEffect(() => {
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }
  }, []);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
  
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># {currentChannelName}</b></p>
          <span className="text-muted">{filteredMessages.length} {countMessages(filteredMessages.length, t)}</span>
        </div>
  
        <div ref={messagesBoxRef} className="flex-grow-1 overflow-auto px-3">
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
                aria-label={t('messages.newMessage')}
                placeholder={t('messages.sendNewMessage')}
                className="border-0 p-0 ps-2 form-control"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                ref={messageInputRef}
              />
              <button type="submit" className="btn btn-group-vertical">
                <BsArrowRightSquare size={20} color="currentColor" />
                <span className="visually-hidden">{t('messages.signupMessages')}</span>
              </button>
            </div>
          </form>
        </div>
  
      </div>
    </div>
  );
}

export default Messages