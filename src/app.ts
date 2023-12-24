import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
  getAuthRouter,
  getUsersRouter,
  getProductsRouter,
  getTestsRouter,
} from './routes';
import { errorMiddleware } from './middlewares';

export const app = express();

app.use(express.json()).use(cookieParser()).use(cors());
app
  .use('/auth', getAuthRouter())
  .use('/users', getUsersRouter())
  .use('/products', getProductsRouter())
  .use('/__test__', getTestsRouter());
app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello NodeJS</h1>`);
});
