import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './chat/Chat'; 
import { addMessageToChannel, setMessagesForChannel  } from '../store/messageSlice';
import { addChannel } from '../store/channelSlice';
import AddChannelModal from './CreateChannel';
import socket from '../socket';

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const [activeChannel, setActiveChannel] = useState('general');
  const messagesByChannel = useSelector((state) => state.messages.messagesByChannel);

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    socket.on('newChannel', (channelName) => {
      dispatch(addChannel(channelName));
    });

    socket.on('channelMessages', ({ channel, messages }) => {
      dispatch(setMessagesForChannel({ channel, messages }));
    });

    return () => {
      socket.off('newChannel');
      socket.off('channelMessages');
    };
  }, [dispatch]);

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  const handleAddMessage = (channel, message) => {
    dispatch(addMessageToChannel({ channel, message }));
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleSubmitChannel = ({ name }) => {
    const sanitized = name.trim().toLowerCase();

    if (
      !sanitized ||
      channels.includes(sanitized) ||
      ['general', 'random'].includes(sanitized)
    ) {
      return;
    }

    dispatch(addChannel(sanitized));
    setActiveChannel(sanitized);
    socket.emit('createChannel', sanitized);
    closeModal();
  };

  const classActive = (channel) => (
    `w-100 rounded-0 text-start btn ${activeChannel === channel ? 'btn-secondary' : ''}`
  );

  const classActiveSecond = (channel) => (
    `w-100 rounded-0 text-start text-truncate btn ${activeChannel === channel ? 'btn-secondary' : ''}`
  );

  const classActiveGroup = (channel) => (
    `flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${activeChannel === channel ? 'btn-secondary' : ''}`
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
            {channels.map((channel, index) => (
              <li className="nav-item w-100" key={channel}>
              {index < 2 ? (
                <button
                  type="button"
                  onClick={() => handleChannelClick(channel)}
                  className={classActive(channel)}
                >
                  <span className="me-1">#</span>{channel}
                </button>
              ) : (
                <div role="group" className="d-flex dropdown btn-group">
                <button
                  type="button"
                  onClick={() => handleChannelClick(channel)}
                  className={classActiveSecond(channel)}
                >
                  <span className="me-1">#</span>{channel}
                </button>
                <button 
                  type="button"
                  aria-expanded="false"
                  className={classActiveGroup(channel)}
                >
                  <span className="visually-hidden">Управление каналом</span>
                </button>
                <div x-placement="bottom-end" className="dropdown-menu" data-popper-reference-hidden="false" data-popper-escaped="false" data-popper-placement="bottom-end" style={{ position: 'absolute', inset: '0px 0px auto auto', transform: 'translate3d(0.666667px, 39.3333px, 0px)' }}>
                  <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Удалить</a>
                  <a data-rr-ui-dropdown-item="" className="dropdown-item" role="button" tabindex="0" href="#">Переименовать</a>
                </div>
                </div>
              )}
              </li>
            ))}
          </ul>
        </div>

        <Chat
          channel={activeChannel}
          messages={messagesByChannel[activeChannel] || []}
          addMessage={(msg) => handleAddMessage(activeChannel, msg)}
        />
        </div>
      </div>
      <AddChannelModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitChannel}
        existingChannels={channels}
      />
    </>
    );
  };

export default Channels;