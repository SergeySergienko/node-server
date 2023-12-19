"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidator = void 0;
const express_validator_1 = require("express-validator");
exports.authValidator = [
    (0, express_validator_1.check)('username', 'username is required').trim().notEmpty(),
    (0, express_validator_1.check)('password', 'the password must contain from 4 to 10 characters')
        .trim()
        .isLength({ min: 4, max: 10 }),
];
//# sourceMappingURL=auth.js.map