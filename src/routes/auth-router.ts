import express from 'express';
import { check } from 'express-validator';

import authController from '../controllers/auth';
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

  return router;
};
