import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import 'dotenv/config';

const url = process.env.mongo_upload_url as string;

export const uploadMiddleware = () => {
  const storage = new GridFsStorage({
    url,
    file: (request, file) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        return {
          bucketName: 'images',
          // filename: `${Date.now()}_${file.originalname}`,
          filename: file.originalname,
        };
      } else {
        return {
          bucketName: 'others',
          filename: `${Date.now()}_${file.originalname}`,
        };
      }
    },
  });
  const upload = multer({ storage });

  return upload.array('files');
};
