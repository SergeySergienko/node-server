import { body, param } from 'express-validator';
import { RoleModel } from '../models';

const userIdValidator = param('id', 'id must have mongoId format').isMongoId();

const userRolesValidator = body(
  'roles',
  'roles must be an array of 1 or 2 elements'
)
  .isArray({ min: 1, max: 2 })
  .custom((arrayOfRoles: RoleModel['value'][]) => {
    return arrayOfRoles.every((role) => role === 'ADMIN' || role === 'USER');
  })
  .withMessage('Invalid role value');

export const updateUserValidator = [userIdValidator, userRolesValidator];

export const deleteUserValidator = [userIdValidator];
