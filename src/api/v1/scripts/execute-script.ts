import { Request, Response} from 'express';
import { ExecuteScriptRequest } from '../../../../../weaver-common/src/operations/scripts/execute-script-request';
import {
  BAD_REQUEST,
  NOT_FOUND
} from 'http-status-codes';
import { ClientManager } from '../../../clients/client-manager';
import { executeScript } from '../../../operations/scripts/execute-script';

export async function executeScriptApi(req: Request, res: Response): Promise<void> {
  const execRequest: ExecuteScriptRequest = Object.assign(
    new ExecuteScriptRequest('dummyid'), 
    req.body as ExecuteScriptRequest
  );

  if (!execRequest || !execRequest.isValid()) {
    res.status(BAD_REQUEST).send();

    return;
  }

  const clientId = execRequest.clientId;
  const script = execRequest.data || [];

  const client = ClientManager.Instance.getClient(clientId);

  if (!client) {
    res.status(NOT_FOUND).send();

    return;
  }

  const io = await executeScript(client.socket, execRequest.runLineByLine, script);

  res.send(io);
};
