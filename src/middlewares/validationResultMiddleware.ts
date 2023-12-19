import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const getValidationResult = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else return res.status(400).send({ errors: result.array() });
};
