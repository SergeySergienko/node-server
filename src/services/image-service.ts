import { ApiError } from '../exceptions/api-error';
import { imagesRepo } from '../repositories';

export const imageService = {
  async findImages() {
    const images = await imagesRepo.findImages();
    if (!images) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return images;
  },

  async downloadImageByName(filename: string) {
    return await imagesRepo.downloadImageByName(filename);
  },
};
