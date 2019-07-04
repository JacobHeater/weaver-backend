import { Application } from 'express';
import express from 'express';
import { listClients } from './clients/list-clients';

export function exposeApi(app: Application) {
  const router = express.Router();

  router.get('/clients', listClients);

  app.use('/api/v1', router);
};
