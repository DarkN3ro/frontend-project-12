import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Chat from './chat/Chat'; 
import { addMessageToChannel, setMessagesForChannel } from '../store/messageSlice';
import { addChannel, removeChannel, renameChannel } from '../store/channelsSlice';
import AddChannelModal from './CreateChannel';
import RemoveChannelModal from './RemoveChannel';
import RenameChannelModal from './RenameChannels';
import i18next from '../i18n';
import socket from '../socket';
import { useSendMessageMutation } from '../services/messagesApi'; // Импорт мутации для отправки сообщений

const Channels = () => {
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const channels = useSelector((state) => state.channels.channels);
  const messagesByChannel = useSelector((state) => state.messages.messagesByChannel);

  const [activeChannel, setActiveChannel] = useState('general');
  const [modalOpen, setModalOpen] = useState(false);
  const [removeModalOpen, setRemoveModalOpen] = useState(false);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); 
  const [currentChannel, setCurrentChannel] = useState(null);

  // RTK Mutation for sending new message
  const [sendNewMessage] = useSendMessageMutation();

  useEffect(() => {
    socket.on('newChannel', (channelName) => {
      dispatch(addChannel(channelName));
    });

    socket.on('channelMessages', ({ channel, messages }) => {
      dispatch(setMessagesForChannel({ channel, messages }));
    });

    socket.on('channelRemoved', (channelName) => {
      dispatch(removeChannel(channelName));
      if (activeChannel === channelName) {
        setActiveChannel('general');
      }
    });
  
    socket.on('channelRenamed', ({ oldName, newName }) => {
      dispatch(renameChannel({ oldName, newName }));
      if (activeChannel === oldName) {
        setActiveChannel(newName);
      }
    });

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside, true);

    return () => {
      socket.off('newChannel');
      socket.off('channelMessages');
      socket.off('channelRemoved');
      socket.off('channelRenamed');

      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [dispatch, activeChannel]);

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  const handleAddMessage = (channel, message) => {
    // Use POST request to send message
    sendNewMessage({ channel, message }).unwrap()
      .then((response) => {
        console.log('Message sent successfully:', response);
        dispatch(addMessageToChannel({ channel, message }));
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  const handleCreateChannel = () => {
    setModalOpen(true);
  };

  const handleDeleteChannel = (channel) => {
    setCurrentChannel(channel);
    setRemoveModalOpen(true);
    setOpenDropdown(null);
  };
  
  const handleRenameChannel = (channel) => {
    setCurrentChannel(channel);
    setRenameModalOpen(true);
    setOpenDropdown(null);
  };

  const closeModal = () => {
    setModalOpen(false);
  };  
  
  const closeRemoveModal = () => {
    setRemoveModalOpen(false);
    setCurrentChannel(null);
  };
  
  const closeRenameModal = () => {
    setRenameModalOpen(false);
    setCurrentChannel(null);
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

    console.log('Creating channel:', sanitized);
    dispatch(addChannel(sanitized));
    setActiveChannel(sanitized);
    socket.emit('createChannel', sanitized);
    closeModal();
  };

  const toggleDropdown = (channel) => {
    setOpenDropdown((prev) => (prev === channel ? null : channel));
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
                onClick={handleCreateChannel}
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
                    <div role="group" ref={openDropdown === channel ? dropdownRef : null} className={`d-flex dropdown btn-group ${openDropdown === channel ? 'show' : ''}`}>
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
                        className={`${classActiveGroup(channel)} ${openDropdown === channel ? 'show' : ''}`}
                        onClick={() => toggleDropdown(channel)}
                      >
                        <span className="visually-hidden">{i18next.t('channels.channelNavigate')}</span>
                      </button>
                      <div className={`dropdown-menu ${openDropdown === channel ? 'show' : ''}`}>
                        <a 
                          className="dropdown-item" 
                          onClick={() => handleDeleteChannel(channel)}
                        >
                          {i18next.t('channels.removeChannel')}
                        </a>
                        <a 
                          className="dropdown-item" 
                          onClick={() => handleRenameChannel(channel)}
                        >
                          {i18next.t('channels.renameChannel')}
                        </a>
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
      
      {/* Modals */}
      <AddChannelModal
        show={modalOpen}
        onClose={closeModal}
        onSubmit={handleSubmitChannel}
        existingChannels={channels}
      />
      {removeModalOpen && (
        <RemoveChannelModal
          show={true}
          onClose={closeRemoveModal}
          channel={currentChannel}
          onRemove={(channel) => {
            socket.emit('removeChannel', channel);
            closeRemoveModal();
          }}
        />
      )}
      {renameModalOpen && (
        <RenameChannelModal
          show={true}
          onClose={closeRenameModal}
          channel={currentChannel}
          existingChannels={channels}
          onSubmit={(values) => {
            socket.emit('renameChannel', { oldName: currentChannel, newName: values.name.trim().toLowerCase() });
            closeRenameModal();
          }}
        />
      )}
    </>
  );
};

export default Channels;