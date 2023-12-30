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

  async updateUser(user: UserViewModel) {
    const result = await usersRepo.updateUser(user);
    if (result.matchedCount !== 1) {
      throw ApiError.NotFound(`Product with id: ${user._id} wasn't found`);
    }
    return user;
  },

  async deleteUser(id: string) {
    const result = await usersRepo.deleteUser(id);
    if (result.deletedCount !== 1) {
      throw ApiError.NotFound(`User with id: ${id} wasn't found`);
    }
    return id;
  },
};
