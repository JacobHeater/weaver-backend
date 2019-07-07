import { Socket } from 'socket.io';
import { WANT_CLIENTS, POST_WANT_CLIENTS } from '../../../../weaver-common/src/common/events';
import { WantClientsRequest } from '../../../../weaver-common/src/operations/want-clients/want-clients-request';
import { WantClientsResponse } from '../../../../weaver-common/src/operations/want-clients/want-clients-response';
import { ClientManager } from '../../clients/client-manager';

export function wantClients(socket: Socket) {
  socket.on(WANT_CLIENTS, (request: WantClientsRequest) => {
    // TODO: Authenticate
    const clients = ClientManager.Instance.clientsToArray();
    const response = new WantClientsResponse(clients);

    socket.emit(POST_WANT_CLIENTS, response);
  });
};
