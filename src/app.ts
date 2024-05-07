import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import {
  getAuthRouter,
  getUsersRouter,
  getProductsRouter,
  getImagesRouter,
  getUploadRouter,
} from './routes';
import { errorMiddleware } from './middlewares';

export const app = express();
app
  .use(express.static(path.join(__dirname, 'public')))
  .use(express.json())
  .use(cookieParser())
  .use(
    cors({
      credentials: true,
      // origin: process.env.CLIENT_URL,
    })
  );
app
  .use('/api/auth', getAuthRouter())
  .use('/api/users', getUsersRouter())
  .use('/api/products', getProductsRouter())
  .use('/api/images', getImagesRouter())
  .use('/api/upload', getUploadRouter());
app.use(errorMiddleware);
