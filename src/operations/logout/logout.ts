import { Socket } from "socket.io";
import { LogoutRequest } from "../../../../weaver-common/src/operations/logout/logout-request";
import { LogoutResponse } from "../../../../weaver-common/src/operations/logout/logout-response";
import { StatusCodes } from "../../../../weaver-common/src/enums/status-codes";
import { ClientManager } from "../../clients/client-manager";

export const events = {
  logout: 'logout',
  postLogout: 'post-logout'
};

export function logout(socket: Socket) {
  socket.on(events.logout, (request: LogoutRequest) => {
    const response = new LogoutResponse();

    if (!request || !request.data || !request.data.isValid()) {
      response.status = StatusCodes.Failure;
      response.failureReasons.push('No client data was present on the request, or the request was invalid.');

      socket.emit(events.postLogout, response);

      return;
    }

    ClientManager.Instance.removeClient(request.data);

    response.status = StatusCodes.Success;

    socket.emit(events.postLogout, response);
  });
};
