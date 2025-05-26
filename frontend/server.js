const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://frontend-project-12-tqne.onrender.com',
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true,
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
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true,
  }
});

const channelMessages = {
  general: [],
  random: [],
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Принимает сообщения по каналам
  socket.on('getMessages', (channel) => {
    const messages = channelMessages[channel] || [];
    socket.emit('channelMessages', { channel, messages });
  });

  // Создание нового канала
  socket.on('createChannel', (channelName) => {
    if (!channelMessages[channelName]) {
      channelMessages[channelName] = [];
      io.emit('newChannel', channelName);
    }
  });
  
  // Удаление канала и всех сообщений на нем
  socket.on('removeChannel', (channel) => {
    delete channelMessages[channel];
    io.emit('channelRemoved', channel);
  });
  
  // Переименование канала
  socket.on('renameChannel', ({ oldName, newName }) => {
    if (!channelMessages[oldName] || channelMessages[newName]) return;
  
    channelMessages[newName] = channelMessages[oldName];
    delete channelMessages[oldName];
  
    io.emit('channelRenamed', { oldName, newName });
  });

  socket.on('sendMessage', (message) => {
    console.log('Semd message', message);
    const { channel } = message;
    if (!channelMessages[channel]) {
      channelMessages[channel] = [];
    }
    channelMessages[channel].push(message);
    io.emit('newMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Socket.IO server running at port ${port}`);
});