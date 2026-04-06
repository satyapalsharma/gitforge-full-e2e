import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);

app.use(express.static('public'));
app.use(express.json());

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Endpoint to trigger a notification to all connected clients
app.post('/notify', (req, res) => {
  const { message, type } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'message is required' });
  }
  io.emit('notification', { message, type: type || 'info' });
  res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
