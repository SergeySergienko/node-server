import { ObjectId } from 'mongodb';
import { userCollection } from '.';
import { UserOutputModel } from '../models';

export const usersRepo = {
  async findUsers() {
    return await userCollection.find({}).toArray();
  },

  async updateUser(user: UserOutputModel) {
    return await userCollection.findOneAndUpdate(
      { _id: new ObjectId(user.id) },
      { $set: { roles: user.roles } },
      { returnDocument: 'after' }
    );
  },

  async deleteUser(id: string) {
    return await userCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
