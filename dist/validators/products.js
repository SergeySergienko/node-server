"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductValidator = exports.updateProductValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
const productIdValidator = (0, express_validator_1.body)('_id', '_id must have mongoId format').isMongoId();
const productTitleValidator = (0, express_validator_1.body)('title', 'the title must not be empty')
    .trim()
    .notEmpty();
const productPriceValidator = (0, express_validator_1.body)('price', 'the price must have numeric format').matches(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);
exports.createProductValidator = [
    productTitleValidator,
    productPriceValidator,
];
exports.updateProductValidator = [
    productIdValidator,
    ...exports.createProductValidator,
];
exports.deleteProductValidator = (0, express_validator_1.param)('id', 'id must have mongoId format').isMongoId();
//# sourceMappingURL=products.js.map