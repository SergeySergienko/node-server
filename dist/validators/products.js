"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductValidator = exports.updateProductValidator = exports.createProductValidator = exports.findProductsValidator = void 0;
const express_validator_1 = require("express-validator");
const productIdValidator = (0, express_validator_1.body)('_id', '_id must have mongoId format').isMongoId();
const productTitleValidator = (0, express_validator_1.body)('title', 'the title must not be empty')
    .trim()
    .notEmpty();
const productPriceValidator = (0, express_validator_1.body)('price', 'the price must have numeric format').matches(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);
const productLimitValidator = (0, express_validator_1.query)('limit', 'query parameter limit must be a number')
    .default(1000000000)
    .isNumeric();
const productSortDirectionValidator = (0, express_validator_1.query)('sortDirection', 'query parameter sortDirection must be asc or desc')
    .default('asc')
    .isIn(['asc', 'desc']);
exports.findProductsValidator = [
    productLimitValidator,
    productSortDirectionValidator,
];
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