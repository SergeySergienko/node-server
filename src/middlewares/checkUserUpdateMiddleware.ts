import { NextFunction, Response } from 'express';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, UserUpdateModel } from '../models';
import tokenService from '../services/token-service';
import { RequestWithBody } from '../types';

export const checkUserUpdateMiddleware = (
  req: RequestWithBody<UserUpdateModel>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const userData =
      tokenService.validateRefreshToken<CustomJwtPayload>(refreshToken);

    if (req.body.id === userData?.id) {
      throw ApiError.ForbiddenError(
        'User is not allowed to update their roles'
      );
    }

    next();
  } catch (error) {
    return next(error);
  }
};
