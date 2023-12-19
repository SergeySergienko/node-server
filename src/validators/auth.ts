import { check } from 'express-validator';

export const authValidator = [
  check('username', 'username is required').trim().notEmpty(),
  check('password', 'the password must contain from 4 to 10 characters')
    .trim()
    .isLength({ min: 4, max: 10 }),
];
