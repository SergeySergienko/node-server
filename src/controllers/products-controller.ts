import { NextFunction, Request, Response } from 'express';
import { WithId } from 'mongodb';

import { productService } from '../services';
import {
  GetProductParamsDto,
  GetProductsQueryDto,
  ProductModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
} from '../types';

class ProductsController {
  async findProducts(
    req: RequestWithQuery<GetProductsQueryDto>,
    res: Response<WithId<ProductModel>[]>,
    next: NextFunction
  ) {
    const { title, limit } = req.query;
    try {
      const products = await productService.findProducts({ title, limit });
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async findProductById(
    req: RequestWithParams<GetProductParamsDto>,
    res: Response<WithId<ProductModel>>,
    next: NextFunction
  ) {
    try {
      const product = await productService.findProductById(req.params.id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: RequestWithBody<ProductModel>,
    res: Response<WithId<ProductModel>>,
    next: NextFunction
  ) {
    try {
      const product = await productService.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: RequestWithBody<WithId<ProductModel>>,
    res: Response<WithId<ProductModel>>,
    next: NextFunction
  ) {
    try {
      const product = await productService.updateProduct(req.body);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await productService.deleteProduct(req.params.id);
      return res.json({ id, message: 'Product was deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
