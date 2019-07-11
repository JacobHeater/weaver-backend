import { Socket } from 'socket.io';
import { GET_CLIENTS, POST_GET_CLIENTS } from '../../../../weaver-common/src/common/events';
import { GetClientsRequest } from '../../../../weaver-common/src/operations/get-clients/get-clients-request';
import { GetClientsResponse } from '../../../../weaver-common/src/operations/get-clients/get-clients-response';
import { ClientManager } from '../../clients/client-manager';

export function getClients(socket: Socket) {
  socket.on(GET_CLIENTS, (request: GetClientsRequest) => {
    // TODO: Authenticate
    const clients = ClientManager.Instance.clientsToArray();
    const response = new GetClientsResponse(clients);

    socket.emit(POST_GET_CLIENTS, response);
  });
};
