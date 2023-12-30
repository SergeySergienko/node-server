import { Request, Response, NextFunction } from 'express';
import { RequestWithBody, RequestWithParams, UserDto } from '../types';
import authService from '../services/auth-service';
import { ApiError } from '../exceptions/api-error';

class AuthController {
  async signup(
    req: RequestWithBody<UserDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userData = await authService.signup(req.body);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.status(201).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(
    req: RequestWithBody<UserDto>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const userData = await authService.login({ email, password });
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const { deletedCount } = await authService.logout(refreshToken);
      if (deletedCount === 1) {
        res.clearCookie('refreshToken');
        return res
          .status(200)
          .json({ message: 'User successfully logged out' });
      }
      throw ApiError.NotFound('Logout Error');
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
      const isActivated = await authService.activate(activationLink);
      if (!isActivated) {
        return res.sendStatus(500);
      }
      return res.json({ message: 'User activated' });
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await authService.refresh(refreshToken);
      res.cookie('refreshToken', userData.refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
