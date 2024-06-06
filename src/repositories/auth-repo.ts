import { UserModel } from '../models';
import { userCollection } from './db';

export const authRepo = {
  async createUser(user: UserModel) {
    return await userCollection.insertOne(user);
  },

  async activateUser(activationLink: string) {
    return await userCollection.findOneAndUpdate(
      { activationLink },
      { $set: { isActivated: true }, $unset: { activationLink: '' } },
      { returnDocument: 'after' }
    );
  },
};
