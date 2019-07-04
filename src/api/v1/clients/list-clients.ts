import { Request, Response} from 'express';
import { ClientManager } from '../../../clients/client-manager';

export function listClients(req: Request, res: Response) {

  res.send(ClientManager.Instance.clientsToTable());
  
};
