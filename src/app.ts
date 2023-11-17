import express from 'express';
import { db } from './db/db';
import { getProductsRouter, getTestsRouter } from './routes';

export const app = express();

app
  .use(express.json())
  .use('/products', getProductsRouter(db))
  .use('/__test__', getTestsRouter(db));
