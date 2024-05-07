import { GridFSBucket } from 'mongodb';
import { imageCollection, uploadsDB } from '.';

export const imagesRepo = {
  async findImages() {
    return await imageCollection.find({}).toArray();
  },

  async downloadImageByName(filename: string) {
    const imageBucket = new GridFSBucket(uploadsDB, {
      bucketName: 'images',
    });
    const downloadStream = imageBucket.openDownloadStreamByName(filename);

    return downloadStream;
  },
};
