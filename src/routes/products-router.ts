import express, { Request, Response } from 'express';
import {
  GetProductParamsDto,
  GetProductsQueryDto,
  CreateProductDto,
  ProductViewModel,
  UpdateProductDto,
} from '../models';
import { productSevice } from '../domain/product-service';
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

  router.post(
    '/',
    async (
      req: RequestWithBody<CreateProductDto>,
      res: Response<ProductViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(400);
        return;
      }
      const product = await productSevice.createProduct(req.body.title);
      if (product) {
        res.status(201).json(product);
      } else {
        res.sendStatus(500);
      }
    }
  );

  router.put(
    '/',
    async (
      req: RequestWithBody<UpdateProductDto>,
      res: Response<ProductViewModel>
    ) => {
      const { id, title, price } = req.body;
      if (!id || !title || !price) {
        res.sendStatus(400);
        return;
      }
      const product = await productSevice.updateProduct(req.body);
      if (product) {
        res.status(200).json(product);
      } else {
        res.sendStatus(404);
      }
    }
  );

  router.delete(
    '/:id',
    async (req: RequestWithParams<GetProductParamsDto>, res: Response) => {
      const isDeleted = await productSevice.deleteProduct(+req.params.id);
      if (isDeleted) {
        res.status(204).send(`Product with id: ${req.params.id} was deleted.`);
      } else {
        res.status(404).send(`Product with id: ${req.params.id} wasn't found.`);
      }
    }
  );

  return router;
};
