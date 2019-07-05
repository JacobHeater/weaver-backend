import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import { register } from './operations/register/register';
import { exposeApi as apiV1 } from './api/v1';
import bodyParser from 'body-parser';
import {
  DISCONNECT
} from '../../weaver-common/src/common/events';
import { ClientManager } from './clients/client-manager';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const io = socketio(server);

io.on('connection', socket => {
  register(socket);

  socket.on(DISCONNECT, () => {
    const matchClient = ClientManager.Instance.getClientBySocket(socket);

    if (matchClient) {
      ClientManager.Instance.removeClient(matchClient.client);
    }
  });
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('Heartbeat'));

apiV1(app);

server.listen(port, () => console.log(`Listening on port ${port}...`));
