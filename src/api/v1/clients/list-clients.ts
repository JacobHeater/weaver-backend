import { Request, Response} from 'express';
import { ClientManager } from '../../../clients/client-manager';

export function listClientsAsTableApi(req: Request, res: Response) {
  res.send(ClientManager.Instance.clientsToTable());
};

export function listClientsAsJsonApi(req: Request, res: Response) {
  res.send(ClientManager.Instance.clientsToArray());
};
