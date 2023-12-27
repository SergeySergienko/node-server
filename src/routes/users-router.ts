import express from 'express';

import usersController from '../controllers/users-controller';
import { authMiddleware } from '../middlewares';

export const getUsersRouter = () => {
  const router = express.Router();

  router.get('/', authMiddleware(['ADMIN']), usersController.findUsers);

  return router;
};
