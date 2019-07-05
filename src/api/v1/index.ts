import { Application } from 'express';
import express from 'express';
import { listClientsAsTableApi, listClientsAsJsonApi } from './clients/list-clients';
import { executeScriptApi } from './scripts/execute-script';

export function exposeApi(app: Application) {
  const router = express.Router();

  router.get('/clients', listClientsAsJsonApi);
  router.get('/clients/table', listClientsAsTableApi);
  router.post('/script', executeScriptApi);

  app.use('/api/v1', router);
};
