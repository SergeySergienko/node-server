import express, { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { getValidationResult } from './middlewares';
import {
  getAuthRouter,
  getUsersRouter,
  getProductsRouter,
  getTestsRouter,
} from './routes';

export const app = express();

const queryValidator = check('token')
  .if((value, { req }) => req.url.includes('token'))
  .notEmpty()
  .withMessage('Token is required')
  .isNumeric()
  .withMessage('Token should be numeric');

app
  .use(express.json())
  .use('/auth', getAuthRouter())
  .use('/users', getUsersRouter())
  .use('/products', getProductsRouter())
  .use('/__test__', getTestsRouter());

app.get(
  '/',
  queryValidator,
  getValidationResult,
  (req: Request, res: Response) => {
    res.send(`<h1>Hello NodeJS</h1>`);
  }
);
