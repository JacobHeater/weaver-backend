import { Socket } from "socket.io";
import { RegistrationRequest } from "./registration-request";
import { RegistrationResponse } from "./registration-response";
import { StatusCodes } from "../../enums/status-codes";
import { ClientSocketPair } from "../../clients/client-socket-pair";
import { ClientManager } from "../../clients/client-manager";

export const events = {
  register: 'register',
  postRegister: 'post-register'
};

export function register(socket: Socket) {
  socket.on(events.register, (request: RegistrationRequest) => {
    const response = new RegistrationResponse();
    
    if (!request || !request.data || !request.data.isValid()) {
      response.status = StatusCodes.Failure;
      response.failureReasons.push('Client data was not present in the request, or was not valid.');

      socket.emit(events.postRegister, response);

      return;
    }

    const clientSocketPair = new ClientSocketPair(request.data, socket);

    ClientManager.Instance.addClient(clientSocketPair);

    response.status = StatusCodes.Success;

    socket.emit(events.postRegister, response);
  });
};
