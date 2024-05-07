import express from 'express';

import uploadController from '../controllers/upload-controller';
import { authMiddleware, uploadMiddleware } from '../middlewares';

export const getUploadRouter = () => {
  const router = express.Router();

  router.post(
    '/',
    // authMiddleware,
    uploadMiddleware(),
    uploadController.uploadFiles
  );

  return router;
};
