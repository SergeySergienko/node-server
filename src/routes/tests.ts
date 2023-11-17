import express, { Request, Response } from 'express';
import { DBType } from '../types';

export const getTestsRouter = (db: DBType) => {
  const router = express.Router();

  router.delete('/data', (req: Request, res: Response) => {
    db.products = [];
    res.sendStatus(204);
  });

  return router;
};
