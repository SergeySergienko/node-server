import { body, param, query } from 'express-validator';

const productIdValidator = body(
  '_id',
  '_id must have mongoId format'
).isMongoId();
const productTitleValidator = body('title', 'the title must not be empty')
  .trim()
  .notEmpty();
const productPriceValidator = body(
  'price',
  'the price must have numeric format'
).matches(/^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/);

const productLimitValidator = query(
  'limit',
  'query parameter limit must be a number'
)
  .default(1_000_000_000)
  .isNumeric();
const productSortDirectionValidator = query(
  'sortDirection',
  'query parameter sortDirection must be asc or desc'
)
  .default('asc')
  .isIn(['asc', 'desc']);

export const findProductsValidator = [
  productLimitValidator,
  productSortDirectionValidator,
];

export const createProductValidator = [
  productTitleValidator,
  productPriceValidator,
];

export const updateProductValidator = [
  productIdValidator,
  ...createProductValidator,
];

export const deleteProductValidator = param(
  'id',
  'id must have mongoId format'
).isMongoId();
