"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserValidator = void 0;
const express_validator_1 = require("express-validator");
exports.deleteUserValidator = (0, express_validator_1.param)('id', 'id must have mongoId format').isMongoId();
//# sourceMappingURL=users.js.map