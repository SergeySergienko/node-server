import { param } from 'express-validator';

export const deleteUserValidator = param(
  'id',
  'id must have mongoId format'
).isMongoId();
