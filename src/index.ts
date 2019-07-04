import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { register } from './operations/register/register';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketio(server);

io.on('connection', socket => {
  register(socket);
});

app.get('/', (req, res) => res.send('Heartbeat'));

server.listen(port, () => console.log(`Listening on port ${port}...`));
