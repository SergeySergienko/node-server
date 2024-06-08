"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = exports.updateUserValidator = void 0;
const express_validator_1 = require("express-validator");
const userIdValidator = (0, express_validator_1.body)('id', 'id must have mongoId format').isMongoId();
const userRolesValidator = (0, express_validator_1.body)('roles', 'roles must be an array of 1 or 2 elements')
    .isArray({ min: 1, max: 2 })
    .custom((arrayOfRoles) => {
    return arrayOfRoles.every((role) => role === 'ADMIN' || role === 'USER');
})
    .withMessage('Invalid role value');
exports.updateUserValidator = [userIdValidator, userRolesValidator];
exports.deleteUserValidator = (0, express_validator_1.param)('id', 'id must have mongoId format').isMongoId();
//# sourceMappingURL=users.js.map