import express, { Request, Response } from 'express';
import {
  GetProductParamsDto,
  GetProductsQueryDto,
  CreateProductDto,
  ProductViewModel,
} from '../models';
import {
  DBType,
  ProductType,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from '../types';
import { getProductViewModel } from '../utils';

export const getProductsRouter = (db: DBType) => {
  const router = express.Router();

  router.get(
    '/',
    (
      req: RequestWithQuery<GetProductsQueryDto>,
      res: Response<ProductViewModel[]>
    ) => {
      let foundProducts = db.products;
      if (req.query.title) {
        foundProducts = db.products.filter((p) =>
          p.title.includes(req.query.title)
        );
      }
      res.json(foundProducts.map(getProductViewModel));
    }
  );

  router.get(
    '/:id',
    (
      req: RequestWithParams<GetProductParamsDto>,
      res: Response<ProductViewModel>
    ) => {
      const foundProduct = db.products.find((p) => p.id === +req.params.id);
      if (foundProduct) {
        res.json(getProductViewModel(foundProduct));
      } else {
        res.sendStatus(404);
      }
    }
  );

  router.post(
    '/',
    (
      req: RequestWithBody<CreateProductDto>,
      res: Response<ProductViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(400);
        return;
      }
      const newProduct: ProductType = {
        id: +new Date(),
        title: req.body.title,
        price: 0,
      };
      db.products.push(newProduct);

      res.status(201).json(getProductViewModel(newProduct));
    }
  );

  return router;
};
