"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValidationResult = void 0;
const express_validator_1 = require("express-validator");
const getValidationResult = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (result.isEmpty())
        next();
    else
        return res.status(400).send({ errors: result.array() });
};
exports.getValidationResult = getValidationResult;
//# sourceMappingURL=validationResultMiddleware.js.map