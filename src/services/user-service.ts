import { ApiError } from '../exceptions/api-error';
import { UserOutputModel } from '../models';
import { usersRepo } from '../repositories';
import { userModelMapper } from '../utils';

export const userService = {
  async findUsers() {
    const users = await usersRepo.findUsers();
    if (!users) {
      throw ApiError.ServerError('Internal Server Error');
    }
    const usersForView: UserOutputModel[] = users.map(userModelMapper);
    return usersForView;
  },

  async updateUser(user: UserOutputModel): Promise<UserOutputModel> {
    const updatedUser = await usersRepo.updateUser(user);
    if (!updatedUser) {
      throw ApiError.NotFound(`Product with id: ${user.id} wasn't found`);
    }
    return userModelMapper(updatedUser);
  },

  async deleteUser(id: string) {
    const result = await usersRepo.deleteUser(id);
    if (result.deletedCount !== 1) {
      throw ApiError.NotFound(`User with id: ${id} wasn't found`);
    }
    return id;
  },
};
