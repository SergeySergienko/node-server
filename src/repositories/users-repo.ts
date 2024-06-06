import { ObjectId } from 'mongodb';
import { roleCollection, userCollection } from '.';
import { RoleModel, UserModel, UserOutputModel } from '../models';

export const usersRepo = {
  async findUser<T extends keyof UserModel>(field: T, value: UserModel[T]) {
    return await userCollection.findOne({ [field]: value });
  },

  async findUsers() {
    return await userCollection.find({}).toArray();
  },

  async updateUser(user: UserOutputModel) {
    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(user.id) },
      { $set: { roles: user.roles } },
      { returnDocument: 'after' }
    );
    return result.value;
  },

  async deleteUser(id: string) {
    return await userCollection.deleteOne({ _id: new ObjectId(id) });
  },

  async findRole(value: RoleModel['value']) {
    return await roleCollection.findOne({
      value,
    });
  },
};
