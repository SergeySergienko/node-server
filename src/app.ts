import express, { Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
  getAuthRouter,
  getUsersRouter,
  getProductsRouter,
  getImagesRouter,
} from './routes';
import { errorMiddleware } from './middlewares';
import { upload } from './repositories';

export const app = express();

app
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
  .use('/images', getImagesRouter());
app.use(errorMiddleware);

app.get('/', (req: Request, res: Response) => {
  res.send(`<h1>Hello NodeJS</h1>`);
});

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  return res.json({
    message: 'Uploaded',
    id: file?.id,
    name: file?.filename,
    contentType: file?.mimetype,
  });
});
