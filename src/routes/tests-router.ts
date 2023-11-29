import express, { Request, Response } from 'express';
import { testsRepo } from '../repositories';

export const getTestsRouter = () => {
  const router = express.Router();

  router.delete('/data', (req: Request, res: Response) => {
    testsRepo.deleteProducts();
    res.sendStatus(204);
  });

  return router;
};
