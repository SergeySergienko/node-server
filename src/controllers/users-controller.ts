import { NextFunction, Request, Response } from 'express';
import { RoleModel, UserOutputModel, UserUpdateModel } from '../models';
import { userService } from '../services';
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
} from '../types';

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
    req: RequestWithParamsAndBody<
      { id: string },
      { roles: Array<RoleModel['value']> }
    >,
    res: Response<UserOutputModel>,
    next: NextFunction
  ) {
    const {
      params: { id },
      body: { roles },
    } = req;
    try {
      const user = await userService.updateUser({ id, roles });
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
