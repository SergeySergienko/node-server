import express from 'express';

import imagesController from '../controllers/images-controller';

export const getImagesRouter = () => {
  const router = express.Router();

  router.get('/', imagesController.findImages);

  router.get('/download/:filename', imagesController.downloadImageByName);

  return router;
};
