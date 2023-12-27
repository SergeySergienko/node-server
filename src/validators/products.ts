import { body, param } from 'express-validator';

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
