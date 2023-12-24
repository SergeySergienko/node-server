import express from 'express';

import authController from '../controllers/auth-controller';
import { authValidator } from '../validators';
import { getValidationResult } from '../middlewares';

export const getAuthRouter = () => {
  const router = express.Router();

  router.post(
    '/signup',
    authValidator,
    getValidationResult,
    authController.signup
  );
  router.post('/login', authController.login);
  router.post('/logout', authController.logout);
  router.get('/activate/:link', authController.activate);
  router.get('/refresh', authController.refresh);

  return router;
};
