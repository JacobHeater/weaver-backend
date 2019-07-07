import { Socket, Server } from "socket.io";
import { RegistrationRequest } from "../../../../weaver-common/src/operations/register/register-request";
import { RegistrationResponse } from "../../../../weaver-common/src/operations/register/register-response";
import { StatusCodes } from "../../../../weaver-common/src/enums/status-codes";
import { ClientSocketPair } from "../../clients/client-socket-pair";
import { ClientManager } from "../../clients/client-manager";
import { Factory} from '../../../../weaver-common/src/helpers/factory';
import { Client } from '../../../../weaver-common/src/common/client';
import { REGISTER, POST_REGISTER, NEW_CLIENT_REGISTERED } from '../../../../weaver-common/src/common/events';

export function register(socket: Socket, io: Server) {
  socket.on(REGISTER, (request: RegistrationRequest) => {
    const response = new RegistrationResponse();

    request.data = Factory.from(Client, request.data);
    
    if (!request || !request.data || !request.data.isValid()) {
      response.status = StatusCodes.Failure;
      response.failureReasons.push('Client data was not present in the request, or was not valid.');

      socket.emit(POST_REGISTER, response);

      return;
    }

    const clientSocketPair = new ClientSocketPair(request.data, socket);

    ClientManager.Instance.addClient(clientSocketPair);

    response.status = StatusCodes.Success;

    io.emit(NEW_CLIENT_REGISTERED);

    socket.emit(POST_REGISTER, response);
  });
};
