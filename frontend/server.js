const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-project-12-tqne.onrender.com'
];

// CORS только для API-запросов
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
}));

app.use(express.json()); // Для парсинга JSON в body

// Простейшая авторизация
app.post('/api/v1/login', (req, res) => {
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

const __dirnameFull = path.resolve();
const clientPath = path.join(__dirnameFull, 'dist');

app.use(express.static(clientPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
  }
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

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at port ${PORT}`);
});