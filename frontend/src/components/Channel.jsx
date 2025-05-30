import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../services/channelsApi.js';
import { setChannels, setCurrentChannelId } from '../store/channelsSlice.js';

const Channel = () => {
  const dispatch = useDispatch();
  const { data: fetchedChannels = [], isSuccess } = useGetChannelsQuery();
  const channels = useSelector(state => state.channels.channels);
  const currentChannelId = useSelector(state => state.channels.currentChannelId);

  useEffect(() => {
    if (isSuccess && fetchedChannels.length > 0) {
      dispatch(setChannels(fetchedChannels));
      
      const generalChannel = fetchedChannels.find(ch => ch.name === 'general');
      dispatch(setCurrentChannelId(generalChannel.id));
    }
  }, [isSuccess, fetchedChannels, dispatch]);

  const handleChannelClick = (id) => {
    dispatch(setCurrentChannelId(id));
  };

  const classActive = (id) => (
    id === currentChannelId ? 'btn btn-secondary w-100 rounded-0 text-start' : 'btn btn-light w-100 rounded-0 text-start'
  );

    return (
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
            <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
              <b>Каналы</b>
              <button 
                type="button" 
                className="p-0 text-primary btn btn-group-vertical"
                title="Добавить канал"
                //onClick={handleCreateChannel}
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
                        //onClick={() => handleChannelClick(channel)}
                        className={classActiveSecond(channel.id)}
                      >
                        <span className="me-1">#</span>{channel.name}
                      </button>
                      <button 
                        type="button"
                        aria-expanded="false"
                        className={`${classActiveGroup(channel.id)} ${openDropdown === channel.id ? 'show' : ''}`}
                        //onClick={() => toggleDropdown(channel)}
                      >
                        <span className="visually-hidden">{i18next.t('channels.channelNavigate')}</span>
                      </button>
                      <div className={`dropdown-menu ${openDropdown === channel.id ? 'show' : ''}`}>
                        <a 
                          className="dropdown-item" 
                          //onClick={() => handleDeleteChannel(channel)}
                        >
                          {i18next.t('channels.removeChannel')}
                        </a>
                        <a 
                          className="dropdown-item" 
                          //onClick={() => handleRenameChannel(channel)}
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
    )
}

export default Channel