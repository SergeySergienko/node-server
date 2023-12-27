import { userCollection } from '.';

export const usersRepo = {
  async findUsers() {
    return await userCollection.find({}).toArray();
  },
};
