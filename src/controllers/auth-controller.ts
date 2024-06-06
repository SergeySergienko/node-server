import { Request, Response, NextFunction } from 'express';
import { RequestWithBody, RequestWithParams } from '../types';
import authService from '../services/auth-service';
import { UserInputModel } from '../models';
import { setCookie } from '../utils';

class AuthController {
  async signup(
    req: RequestWithBody<UserInputModel>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData = await authService.signup(req.body);
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: RequestWithBody<UserInputModel>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login({ email, password });
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');

      return res.json({ message: 'User successfully logged out' });
    } catch (error) {
      next(error);
    }
  }

  async activate(
    req: RequestWithParams<{ link: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const activationLink = req.params.link;
      const userData = await authService.activate(activationLink);
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      setCookie(res, 'refreshToken', userData.refreshToken);

      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
