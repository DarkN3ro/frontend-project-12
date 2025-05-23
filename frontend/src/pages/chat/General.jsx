import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const GeneralChat = ({ messages, addMessage }) => {
  const [messageInput, setMessageInput] = useState('');
  const username = useSelector((state) => state.auth.username);
  const messagesBoxRef = useRef(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketIo = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001', {
      transports: ['websocket'],
    });
    setSocket(socketIo);

    socketIo.on('connect', () => {
      console.log('Connected to WebSocket server:', socketIo.id);
      socketIo.emit('joinChannel', 'general');
    });

    socketIo.on('newMessage', (message) => {
      console.log('New message received:', message);
      addMessage(message);
    });

    socketIo.on('connect_error', (err) => {
      console.error('Socket connection error:', err);
    });

    return () => {
      socketIo.disconnect();
    };
  }, []);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      author: username,
      channel: 'general',
    };

    socket.emit('sendMessage', newMessage);
    setMessageInput('');
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0"><b># random</b></p>
          <span className="text-muted">{messages.length} messages</span>
        </div>
        <div id="messages-box" ref={messagesBoxRef} className="chat-messages overflow-auto px-5">
          {messages.map((msg) => (
            <div key={msg.id} className="text-break mb-2">
              <b>{msg.author}</b>: {msg.text}
            </div>
          ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form onSubmit={handleFormSubmit} className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                value={messageInput}
                onChange={handleInputChange}
              />
              <button type="submit" className="btn btn-group-vertical">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GeneralChat;