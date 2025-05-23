import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import General from './chat/General';
import Random from './chat/Random';
import Chat from './chat/Chat'; 
import { addMessageToChannel } from '../store/messageSlice';
import { addChannel } from '../store/channelSlice';
import AddChannelModal from './Modal';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesByChannel = useSelector((state) => state.messages.messagesByChannel);

  const [modalOpen, setModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [inputError, setInputError] = useState('');

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  const handleAddMessage = (channel, message) => {
    dispatch(addMessageToChannel({ channel, message }));
  };

  const openModal = () => {
    setNewChannelName('');
    setInputError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const onChangeChannelName = (e) => {
    setNewChannelName(e.target.value);
    setInputError('');
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const sanitizedName = newChannelName.trim().toLowerCase();

    if (!sanitizedName) {
      setInputError('Имя канала не может быть пустым');
      return;
    }
    if (channels.includes(sanitizedName) || sanitizedName === 'general' || sanitizedName === 'random') {
      setInputError('Такой канал уже существует или имя недопустимо');
      return;
    }

    dispatch(addChannel(sanitizedName));
    setActiveChannel(sanitizedName);
    setModalOpen(false);
  };

  const classActive = (channel) => (
    `w-100 rounded-0 text-start btn ${activeChannel === channel ? 'btn-secondary' : ''}`
  );

  return (
    <>
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
            <b>Каналы</b>
            <button 
              type="button" 
              className="p-0 text-primary btn btn-group-vertical"
              title="Добавить канал"
              onClick={openModal}
              >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor" className="bi bi-plus-square">
                <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
              </svg>
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
            {channels.map((channel) => (
              <li className="nav-item w-100" key={channel}>
                <button
                  type="button"
                  onClick={() => handleChannelClick(channel)}
                  className={classActive(channel)}
                >
                  <span className="me-1">#</span>{channel}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {activeChannel === 'general' && (
            <General
              messages={messagesByChannel.general || []}
              addMessage={(msg) => handleAddMessage('general', msg)}
            />
          )}
          {activeChannel === 'random' && (
            <Random
              messages={messagesByChannel.random || []}
              addMessage={(msg) => handleAddMessage('random', msg)}
            />
          )}
          {activeChannel !== 'general' && activeChannel !== 'random' && (
            <Chat
              channel={activeChannel}
              messages={messagesByChannel[activeChannel] || []}
              addMessage={(msg) => handleAddMessage(activeChannel, msg)}
            />
          )}
        </div>
      </div>
      <AddChannelModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={onSubmit}
        channelName={newChannelName}
        onChange={onChangeChannelName}
        error={inputError}
      />
    </>
    );
  };

export default Channels;