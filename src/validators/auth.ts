import { body, check } from 'express-validator';

export const authValidator = [
  body('email', 'email must have email format').isEmail(),
  body('password', 'the password must contain from 4 to 10 characters')
    .trim()
    .isLength({ min: 4, max: 10 }),
];
