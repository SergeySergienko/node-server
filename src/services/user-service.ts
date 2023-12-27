import { ApiError } from '../exceptions/api-error';
import { usersRepo } from '../repositories';
import { UserViewModel } from '../types';

export const userService = {
  async findUsers() {
    const users = await usersRepo.findUsers();
    if (!users) {
      throw ApiError.ServerError('Internal Server Error');
    }
    const usersForView: UserViewModel[] = users.map((user) => {
      const { password, ...rest } = user;
      return rest;
    });

    return usersForView;
  },
};
