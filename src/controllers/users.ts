import { Request, Response } from 'express';

import User from '../models/dbModels/User';
import Role from '../models/dbModels/Role';
import { userCollection } from '../repositories';
import { RequestWithBody, UserType } from '../types';
import { SignUpDto } from '../models/userDto/SignUpDto';
import { UserErrorModel, UserViewModel } from '../models/userDto/UserViewModel';

class UsersController {
  async findUsers(
    req: Request,
    res: Response<UserViewModel[] | UserErrorModel>
  ) {
    try {
      const users = await userCollection.find({}).toArray();
      const usersForView: UserViewModel[] = users.map((user) => {
        const { password, ...rest } = user;
        return rest;
      });
      res.json(usersForView);
    } catch (error) {
      console.log(error);
      res.status(500).json({ errorMessage: 'Server Error' });
    }
  }
}

export default new UsersController();
