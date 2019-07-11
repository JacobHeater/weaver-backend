import { ClientManager } from '../../clients/client-manager';
import { Client } from '../../../../weaver-common/src/common/client';
import { Socket } from 'socket.io';
import { GET_CLIENT_BY_ID, POST_GET_CLIENT_BY_ID } from '../../../../weaver-common/src/common/events';
import { GetClientByIdRequest } from '../../../../weaver-common/src/operations/get-clients/get-client-by-id-request';
import { GetClientByIdResponse } from '../../../../weaver-common/src/operations/get-clients/get-client-by-id-response';
import { StatusCodes } from '../../../../weaver-common/src/enums/status-codes';
import { Factory } from '../../../../weaver-common/src/helpers/factory';
import { DEFAULT_ID } from '../../../../weaver-common/src/common/constants';

export function getClientById(socket: Socket): void {
  socket.on(GET_CLIENT_BY_ID, (request: GetClientByIdRequest) => {
    request = Factory.from(new GetClientByIdRequest(DEFAULT_ID), request);

    const response = new GetClientByIdResponse();

    if (!request.isValid()) {
      response.failureReasons.push('No client identifier was provided.');
      response.status = StatusCodes.Failure;

      socket.emit(POST_GET_CLIENT_BY_ID, response);

      return;
    }

    const id = request.data as string;
    const pair = ClientManager.Instance.getClient(id);

    if (pair) {
      response.data = pair.client;
      response.status = StatusCodes.Success;
    } else {
      response.failureReasons.push(`No client was found matching that id '${id}'.`);
      response.status = StatusCodes.Failure;
    }

    socket.emit(POST_GET_CLIENT_BY_ID, response);
  });
};
