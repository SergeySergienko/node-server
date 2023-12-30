import express from 'express';

import usersController from '../controllers/users-controller';
import { authMiddleware, getValidationResult } from '../middlewares';
import { deleteUserValidator } from '../validators/users';

export const getUsersRouter = () => {
  const router = express.Router();

  router.get(
    '/',
    authMiddleware(['OWNER', 'ADMIN']),
    usersController.findUsers
  );
  router.put('/', authMiddleware(['OWNER']), usersController.updateUser);
  router.delete(
    '/:id',
    authMiddleware(['OWNER']),
    deleteUserValidator,
    getValidationResult,
    usersController.deleteUser
  );

  return router;
};
