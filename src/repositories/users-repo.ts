import { ObjectId } from 'mongodb';
import { roleCollection, userCollection } from '.';
import { RoleModel, UserOutputModel, UserUpdateModel } from '../models';

export const usersRepo = {
  async findUser<T extends keyof UserOutputModel>(
    field: T,
    value: UserOutputModel[T]
  ) {
    return await userCollection.findOne({ [field]: value });
  },

  async findUsers() {
    return await userCollection.find({}).toArray();
  },

  async updateUser({ id, roles }: UserUpdateModel) {
    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { roles } },
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
