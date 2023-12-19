import express, { Request, Response } from 'express';
import {
  GetProductParamsDto,
  GetProductsQueryDto,
  CreateProductDto,
  ProductViewModel,
  UpdateProductDto,
  ProductErrorModel,
} from '../models';
import { productSevice } from '../services';
import productsController from '../controllers/products';
import { authMiddleware, roleMiddleware } from '../middlewares';
import { RequestWithBody, RequestWithParams, RequestWithQuery } from '../types';

export const getProductsRouter = () => {
  const router = express.Router();

  router.get(
    '/',
    async (
      req: RequestWithQuery<GetProductsQueryDto>,
      res: Response<ProductViewModel[]>
    ) => {
      const products = await productSevice.findProducts(req.query.title);
      res.json(products);
    }
  );

  router.get(
    '/:id',
    async (
      req: RequestWithParams<GetProductParamsDto>,
      res: Response<ProductViewModel>
    ) => {
      const product = await productSevice.findProductsById(+req.params.id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.sendStatus(404);
      }
    }
  );

  router.post('/', roleMiddleware(['ADMIN']), productsController.createProduct);

  router.put('/', roleMiddleware(['ADMIN']), productsController.updateProduct);

  router.delete(
    '/:id',
    roleMiddleware(['ADMIN']),
    productsController.deleteProduct
  );

  return router;
};
