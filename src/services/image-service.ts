import { ApiError } from '../exceptions/api-error';
import { imagesRepo } from '../repositories';

export const imageService = {
  async findImages(title?: string) {
    const images = await imagesRepo.findImages();
    if (!images) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return images;
  },

  async findImageByName(filename: string) {
    return await imagesRepo.findImageByName(filename);
  },
};
