import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_ACCESS_SECRET } from '../config';
import { CustomRequest } from '../types';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    next();
  }

  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ errorMessage: 'User is not authorized' });
    }
    const decodedData = jwt.verify(token, JWT_ACCESS_SECRET);
    (req as CustomRequest).token = decodedData;
    next();
  } catch (error) {
    console.log(error);
    res.status(403).json({ errorMessage: 'User is not authorized' });
  }
};
