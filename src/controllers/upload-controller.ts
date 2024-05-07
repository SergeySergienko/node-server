import { NextFunction, Request, Response } from 'express';

class UploadController {
  async uploadFiles(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];
      if (!files) {
        return res.status(500).send({ error: 'Internal Server Error' });
      }
      const filesView = files.map(
        ({ id, filename, contentType, uploadDate }) => ({
          id: id.toString(),
          name: filename,
          contentType,
          uploadDate,
        })
      );
      return res.json({
        message: `Uploaded ${filesView.length} files`,
        files: filesView,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new UploadController();
