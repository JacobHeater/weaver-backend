import { Request, Response} from 'express';
import { ExecuteScriptRequest } from './execute-script-request';
import {
  BAD_REQUEST
} from 'http-status-codes';

export function executeScript(req: Request, res: Response) {
  const data: ExecuteScriptRequest = req.body;

  if (!data) {
    res.status(BAD_REQUEST).send();

    return;
  }


};
