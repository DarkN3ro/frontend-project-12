import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery, useAddChannelsMutation, useRemoveChannelMutation, useRenameChannelMutation } from '../services/channelsApi.js';
import { setChannels, setCurrentChannelId, addChannels } from '../store/channelsSlice.js';
import AddChannelModal from '../modals/AddChannels.jsx';
import RemoveChannelModal from '../modals/RemoveChannels.jsx';
import RenameChannelModal from '../modals/RenameChannels.jsx';
import { openCreateModal, openRemoveModal, closeRemoveModal, openRenameModal, closeRenameModal} from '../store/modalsSlice.js';
import { FaPlusSquare } from 'react-icons/fa';
import i18next from '../util/i18n.js';

const Channel = () => {
  const dispatch = useDispatch();
  const { data: fetchedChannels = [], isSuccess } = useGetChannelsQuery();
  const [addChannel] = useAddChannelsMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const [renameChannel] = useRenameChannelMutation();

  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);
  const removeModalOpen = useSelector(state => state.modals.removeModalOpen);
  const renameModalOpen = useSelector(state => state.modals.renameModalOpen);
  const currentChannel = useSelector(state => state.modals.currentChannel);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside, true);
    if (isSuccess && fetchedChannels.length > 0) {
      console.log('fetchedChannels', fetchedChannels)
      dispatch(setChannels(fetchedChannels));
      
      if (!currentChannelId) {
        const generalChannel = fetchedChannels.find(ch => ch.name === 'general');
        if (generalChannel) {
          dispatch(setCurrentChannelId(generalChannel.id));
        }
      }
    }
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isSuccess, fetchedChannels, dispatch]);


  const handleChannelClick = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const handleCreateChannel = () => {
    dispatch(openCreateModal());
  };

  const handleRemoveChannel = (channel) => {
    console.log(channel)
    dispatch(openRemoveModal(channel)); 
  };

  const handleRenameChannel = (channel) => {
    console.log(channel)
    dispatch(openRenameModal(channel)); 
  };

  const handleAddChannelSubmit = async (values) => {
    try {
      const addedChannel = await addChannel({ name: values.name }).unwrap();
      dispatch(addChannels(addedChannel));
      dispatch(setCurrentChannelId(addedChannel.id));
    } catch (err) {
      console.error('Ошибка при добавлении канала:', err);
    }
  };

  const handleRemoveChannelSubmit = async () => {
    if (!currentChannel) return;
    try {
      await removeChannel(currentChannel.id).unwrap();
      dispatch(closeRemoveModal());
  
      if (currentChannel.id === currentChannelId) {
        const generalChannel = channels.find(ch => ch.name === 'general');
        if (generalChannel) {
          dispatch(setCurrentChannelId(generalChannel.id));
        }
      }
    } catch (err) {
      console.error('Ошибка при удалении канала:', err);
    }
  };

const handleRenameChannelSubmit = async ({ name }) => {
  if (!currentChannel) return;
  try {
    await renameChannel({ id: currentChannel.id, name: name.trim() }).unwrap();
    dispatch(closeRenameModal());
  } catch (err) {
    console.error('Ошибка при переименовании канала:', err);
  }
};
  const toggleDropdown = (channel) => {
    setOpenDropdown((prevId) => (prevId === channel.id ? null : channel.id));
  };
  

  const classActive = (id) => (
    `w-100 rounded-0 text-start btn ${ id === currentChannelId ? 'btn-secondary' : '' }`
  );

  const classActiveSecond = (id) => (
    `w-100 rounded-0 text-start text-truncate btn ${ id === currentChannelId ? 'btn-secondary' : '' }`
  );

  const classActiveGroup = (id) => (
    `flex-grow-0 dropdown-toggle dropdown-toggle-split btn ${ id === currentChannelId ? 'btn-secondary' : '' }`
  );

    return (
      <>
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button 
                type="button" 
                className="p-0 text-primary btn btn-group-vertical"
                title="Добавить канал"
                onClick={handleCreateChannel}
              >
                <FaPlusSquare  size={20} color="currentColor" />
                <span className="visually-hidden">+</span>
              </button>
            </div>
            <ul id="channels-box" className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
              {channels.map((channel) => (
                <li className="nav-item w-100" key={channel.id}>
                  {!channel.removable ? (
                    <button
                      type="button"
                      onClick={() => handleChannelClick(channel.id)}
                      className={classActive(channel.id)}
                    >
                      <span className="me-1">#</span>{channel.name}
                    </button>
                  ) : (
                    <div role="group" ref={openDropdown === channel.id ? dropdownRef : null} className={`d-flex dropdown btn-group ${openDropdown === channel.id ? 'show' : ''}`}>
                      <button
                        type="button"
                        onClick={() => handleChannelClick(channel.id)}
                        className={classActiveSecond(channel.id)}
                      >
                        <span className="me-1">#</span>{channel.name}
                      </button>
                      <button 
                        type="button"
                        aria-expanded="false"
                        className={`${classActiveGroup(channel.id)} ${openDropdown === channel.id ? 'show' : ''}`}
                        onClick={() => toggleDropdown(channel)}
                      >
                        <span className="visually-hidden">{i18next.t('channels.channelNavigate')}</span>
                      </button>
                      <div className={`dropdown-menu ${openDropdown === channel.id ? 'show' : ''}`}>
                        <a 
                          className="dropdown-item" 
                          onClick={() => handleRemoveChannel(channel)}
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
          <AddChannelModal onSubmit={handleAddChannelSubmit} existingChannels={channels} />
          <RemoveChannelModal
            show={removeModalOpen}
            onClose={() => dispatch(closeRemoveModal())}
            channel={currentChannel}
            onRemove={handleRemoveChannelSubmit}
          />
          <RenameChannelModal
            show={renameModalOpen}
            onSubmit={handleRenameChannelSubmit}
            onClose={() => dispatch(closeRenameModal())}
            channel={currentChannel}
            existingChannels={channels}
          />
      </>
    )
}

export default Channel