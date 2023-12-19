import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';
import { CustomJwtPayload, RoleType } from '../types';

export const roleMiddleware =
  (roles: Array<RoleType['value']>) =>
  (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next();
    }

    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res
          .status(401)
          .json({ errorMessage: 'User is not authenticated' });
      }
      const payload = jwt.verify(token, SECRET_KEY);
      let hasRole = false;
      (payload as CustomJwtPayload).roles?.forEach((role) => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      });
      if (!hasRole) {
        return res.status(403).json({ errorMessage: 'No access to resource' });
      }
      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ errorMessage: 'User is not authenticated' });
    }
  };
