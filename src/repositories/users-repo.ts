import { ObjectId } from 'mongodb';
import { userCollection } from '.';
import { UserViewModel } from '../types';

export const usersRepo = {
  async findUsers() {
    return await userCollection.find({}).toArray();
  },

  async updateUser(user: UserViewModel) {
    return await userCollection.updateOne(
      { _id: new ObjectId(user._id) },
      { $set: { roles: user.roles } }
    );
  },

  async deleteUser(id: string) {
    return await userCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
