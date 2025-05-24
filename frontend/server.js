import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["https://frontend-project-12-tqne.onrender.com"],
    methods: ["GET", "POST"]
  }
});

let messages = [];

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.emit('newMessage', ...messages);

  socket.on('sendMessage', (msg) => {
    messages.push(msg);
    io.emit('newMessage', msg); 
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(5001, () => {
  console.log('Server listening on http://localhost:5001');
});