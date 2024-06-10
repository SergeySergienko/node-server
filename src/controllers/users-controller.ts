import { NextFunction, Request, Response } from 'express';
import { UserOutputModel, UserUpdateModel } from '../models';
import { userService } from '../services';
import { RequestWithBody } from '../types';

class UsersController {
  async findUsers(
    req: Request,
    res: Response<UserOutputModel[]>,
    next: NextFunction
  ) {
    try {
      const users = await userService.findUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  }

  async updateUser(
    req: RequestWithBody<UserUpdateModel>,
    res: Response<UserOutputModel>,
    next: NextFunction
  ) {
    try {
      const user = await userService.updateUser(req.body);
      return res.json(user);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await userService.deleteUser(req.params.id);
      return res.json({ id, message: 'User was deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();
