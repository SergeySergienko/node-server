import express, { Request, Response } from 'express';
import { productSevice } from '../services';
import productsController from '../controllers/products-controller';
import { getValidationResult, authMiddleware } from '../middlewares';
import {
  GetProductParamsDto,
  GetProductsQueryDto,
  ProductViewModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from '../types';
import {
  createProductValidator,
  deleteProductValidator,
  updateProductValidator,
} from '../validators';

export const getProductsRouter = () => {
  const router = express.Router();

  router.get('/', productsController.findProducts);

  router.get('/:id', productsController.findProductById);

  router.post(
    '/',
    authMiddleware(['ADMIN', 'OWNER']),
    createProductValidator,
    getValidationResult,
    productsController.createProduct
  );

  router.put(
    '/',
    authMiddleware(['ADMIN', 'OWNER']),
    updateProductValidator,
    getValidationResult,
    productsController.updateProduct
  );

  router.delete(
    '/:id',
    authMiddleware(['ADMIN', 'OWNER']),
    deleteProductValidator,
    getValidationResult,
    productsController.deleteProduct
  );

  return router;
};