import express from 'express';

import usersController from '../controllers/users-controller';
import { authMiddleware, roleMiddleware } from '../middlewares';

export const getUsersRouter = () => {
  const router = express.Router();

  router.get(
    '/',
    // roleMiddleware(['ADMIN']),
    usersController.findUsers
  );

  return router;
};
