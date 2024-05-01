import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, RoleModel } from '../models';
import tokenService from '../services/token-service';

export const authMiddleware =
  (roles: Array<RoleModel['value']>) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        throw ApiError.UnauthorizedError();
      }

      const userData =
        tokenService.validateAccessToken<CustomJwtPayload>(token);
      if (!userData) {
        throw ApiError.UnauthorizedError();
      }

      let hasRole = false;
      userData.roles.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        throw ApiError.ForbiddenError();
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
