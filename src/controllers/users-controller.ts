import { NextFunction, Request, Response } from 'express';

import { userService } from '../services';
import { UserViewModel } from '../types';

class UsersController {
  async findUsers(
    req: Request,
    res: Response<UserViewModel[]>,
    next: NextFunction
  ) {
    try {
      const users = await userService.findUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
