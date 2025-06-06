import { useEffect } from 'react'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { FaPlusSquare } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'

import AddChannelModal from '../modals/AddChannels.jsx'
import RemoveChannelModal from '../modals/RemoveChannels.jsx'
import RenameChannelModal from '../modals/RenameChannels.jsx'
import { useGetChannelsQuery, useAddChannelsMutation, useRemoveChannelMutation, useRenameChannelMutation } from '../services/channelsApi.js'
import { setChannels, setCurrentChannelId, addChannels } from '../store/channelsSlice.js'
import { openCreateModal, openRemoveModal, closeRemoveModal, openRenameModal, closeRenameModal } from '../store/modalsSlice.js'

const Channel = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { data: fetchedChannels = [], isSuccess } = useGetChannelsQuery()
  const [addChannel] = useAddChannelsMutation()
  const [removeChannel] = useRemoveChannelMutation()
  const [renameChannel] = useRenameChannelMutation()

  const channels = useSelector(state => state.channels.channels)
  const currentChannelId = useSelector(state => state.channels.currentChannelId)
  const removeModalOpen = useSelector(state => state.modals.removeModalOpen)
  const renameModalOpen = useSelector(state => state.modals.renameModalOpen)
  const currentChannel = useSelector(state => state.modals.currentChannel)

  useEffect(() => {
    if (isSuccess && fetchedChannels.length > 0) {
      dispatch(setChannels(fetchedChannels))
      if (!currentChannelId) {
        const generalChannel = fetchedChannels.find(ch => ch.name === 'general')
        if (generalChannel) {
          dispatch(setCurrentChannelId(generalChannel.id))
        }
      }
    }
  }, [isSuccess, fetchedChannels, dispatch, currentChannelId])

  const handleChannelClick = (id) => {
    dispatch(setCurrentChannelId(id))
  }
  const handleCreateChannel = () => {
    dispatch(openCreateModal())
  }
  const handleRemoveChannel = (channel) => {
    dispatch(openRemoveModal(channel))
  }
  const handleRenameChannel = (channel) => {
    dispatch(openRenameModal(channel))
  }

  const handleAddChannelSubmit = async (values) => {
    try {
      const addedChannel = await addChannel({ name: values.name }).unwrap()
      dispatch(addChannels(addedChannel))
      dispatch(setCurrentChannelId(addedChannel.id))
      toast.success(t('alertSuccess.channelCreated'))
    }
    catch {
      toast.error(t('alertErrors.channelCreatedError'))
    }
  }

  const handleRemoveChannelSubmit = async () => {
    if (!currentChannel) return
    try {
      await removeChannel(currentChannel.id).unwrap()
      dispatch(closeRemoveModal())
      toast.success(t('alertSuccess.channelRemoved'))
    }
    catch {
      toast.error(t('alertErrors.channelRemovedError'))
    }
  }

  const handleRenameChannelSubmit = async ({ name }) => {
    if (!currentChannel) return
    try {
      await renameChannel({ id: currentChannel.id, name: name.trim() }).unwrap()
      dispatch(closeRenameModal())
      toast.success(t('alertSuccess.channelRenamed'))
    }
    catch {
      toast.error(t('alertErrors.channelRenamedError'))
    }
  }

  const classActive = id => (
    `w-100 rounded-0 text-start btn ${id === currentChannelId ? 'btn-secondary' : ''}`
  )

  return (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.titleName')}</b>
          <button
            type="button"
            className="p-0 text-primary btn btn-group-vertical"
            title={t('channels.addChannel')}
            onClick={handleCreateChannel}
          >
            <FaPlusSquare size={20} color="currentColor" />
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels?.map((channel) => {
            if (!channel.removable) {
              return (
                <li className="nav-item w-100" key={channel.id}>
                  <button
                    type="button"
                    onClick={() => handleChannelClick(channel.id)}
                    className={classActive(channel.id)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>
                </li>
              )
            }
            else {
              return (
                <li className="nav-item w-100" key={channel.id}>
                  <Dropdown as={ButtonGroup} className="w-100 d-flex">
                    <button
                      type="button"
                      onClick={() => handleChannelClick(channel.id)}
                      className={classActive(channel.id)}
                      style={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        minWidth: 0,
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </button>
                    <Dropdown.Toggle
                      split
                      variant={channel.id === currentChannelId ? 'secondary' : 'light'}
                      id={`dropdown-split-${channel.id}`}
                    >
                      <span className="visually-hidden">
                        {t('channels.channelNavigate')}
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => handleRemoveChannel(channel)}>
                        {t('channels.removeChannel')}
                      </Dropdown.Item>
                      <Dropdown.Item onClick={() => handleRenameChannel(channel)}>
                        {t('channels.renameChannel')}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              )
            }
          })}
        </ul>
      </div>
      <AddChannelModal
        onSubmit={handleAddChannelSubmit}
        existingChannels={channels}
      />
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
