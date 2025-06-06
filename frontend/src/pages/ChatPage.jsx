import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Channels from '../components/Channel.jsx'
import Messages from '../components/Messages.jsx'
import { useGetChannelsQuery } from '../services/channelsApi.js'
import useSocket from '../util/useSocket.js'

const ChatPage = () => {
  const navigate = useNavigate()
  const { error, isError, refetch } = useGetChannelsQuery()

  useSocket(refetch)

  useEffect(() => {
    if (isError && error?.status === 401) {
      navigate('/login')
    }
  }, [isError, error, navigate])

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  )
}

export default ChatPage
