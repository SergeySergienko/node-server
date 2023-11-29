import express, { NextFunction, Request, Response } from 'express';
import { check } from 'express-validator';
import { getValidationResult } from './middlewares';
import { getProductsRouter, getTestsRouter } from './routes';

export const app = express();

const queryValidator = check('token')
  .if((value, { req }) => req.url.includes('token'))
  .notEmpty()
  .withMessage('Token is required')
  .isNumeric()
  .withMessage('Token should be numeric');

const addEntity =
  (entity: string = 'NodeJS!') =>
  (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    req.entity = entity;
    next();
  };

const AuthGuardMiddleware =
  (token: string = '123') =>
  (req: Request, res: Response, next: NextFunction) => {
    req.query.token === token ? next() : res.sendStatus(401);
  };

app
  .use(express.json())
  // .use(AuthGuardMiddleware('000'))
  .use(addEntity())
  .use('/products', getProductsRouter())
  .use('/__test__', getTestsRouter());

app.get(
  '/',
  queryValidator,
  getValidationResult,
  (req: Request, res: Response) => {
    //@ts-ignore
    res.send(`<h1>Hello ${req.entity}</h1>`);
  }
);
