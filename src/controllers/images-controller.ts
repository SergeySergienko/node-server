import { NextFunction, Request, Response } from 'express';
import { imageService } from '../services';

class ImagesController {
  async findImages(req: Request, res: Response, next: NextFunction) {
    try {
      const images = await imageService.findImages();
      return res.json(images);
    } catch (error) {
      next(error);
    }
  }

  async findImageByName(req: Request, res: Response, next: NextFunction) {
    try {
      const downloadStream = await imageService.findImageByName(
        req.params.filename
      );
      downloadStream.on('data', function (data) {
        return res.status(200).write(data);
      });
      downloadStream.on('error', function (data) {
        return res.status(404).send({ error: 'Image not found' });
      });
      downloadStream.on('end', () => {
        return res.end();
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ImagesController();
