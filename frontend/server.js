const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST']
}));

app.use(express.json()); // <-- Важно, чтобы парсить JSON из POST-запросов

app.post('/v1/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'admin') {
    return res.json({
      token: 'fake-token-admin',
      username: 'admin',
    });
  }

  return res.status(401).json({
    message: 'Неверные имя пользователя или пароль',
  });
});

app.get('/', (req, res) => {
  res.send('Socket.IO backend is running.');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('sendMessage', (message) => {
    console.log('Message received for broadcasting:', message);
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}/`);
});