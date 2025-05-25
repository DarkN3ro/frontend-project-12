import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001', {
  transports: ['websocket'],
  autoConnect: true,
});

export default socket;