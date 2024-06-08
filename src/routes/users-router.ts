import express from 'express';

import usersController from '../controllers/users-controller';
import { authMiddleware, getValidationResult } from '../middlewares';
import { deleteUserValidator, updateUserValidator } from '../validators';

export const getUsersRouter = () => {
  const router = express.Router();

  router.get(
    '/',
    authMiddleware(['OWNER', 'ADMIN']),
    usersController.findUsers
  );
  router.put(
    '/',
    authMiddleware(['OWNER']),
    updateUserValidator,
    getValidationResult,
    usersController.updateUser
  );
  router.delete(
    '/:id',
    authMiddleware(['OWNER']),
    deleteUserValidator,
    getValidationResult,
    usersController.deleteUser
  );

  return router;
};
