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

  async downloadImageByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { filename } = req.params;

      const downloadStream = await imageService.downloadImageByName(filename);
      downloadStream.on('data', function (data) {
        return res.status(200).write(data);
      });
      downloadStream.on('error', function () {
        return res
          .status(404)
          .send({ error: `Image with name: ${filename} not found` });
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
