import { NextFunction, Request, Response } from 'express';

import { productSevice } from '../services';
import {
  CreateProductDto,
  GetProductParamsDto,
  GetProductsQueryDto,
  ProductViewModel,
  RequestWithBody,
  RequestWithParams,
  RequestWithQuery,
  UpdateProductDto,
} from '../types';

class ProductsController {
  async findProducts(
    req: RequestWithQuery<GetProductsQueryDto>,
    res: Response<ProductViewModel[]>,
    next: NextFunction
  ) {
    try {
      const products = await productSevice.findProducts(req.query.title);
      return res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async findProductById(
    req: RequestWithParams<GetProductParamsDto>,
    res: Response<ProductViewModel>,
    next: NextFunction
  ) {
    try {
      const product = await productSevice.findProductById(req.params.id);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(
    req: RequestWithBody<CreateProductDto>,
    res: Response<ProductViewModel>,
    next: NextFunction
  ) {
    try {
      const product = await productSevice.createProduct(req.body);
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(
    req: RequestWithBody<UpdateProductDto>,
    res: Response<ProductViewModel>,
    next: NextFunction
  ) {
    try {
      const product = await productSevice.updateProduct(req.body);
      return res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const id = await productSevice.deleteProduct(req.params.id);
      return res.json({ id, message: 'Product was deleted successfully' });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
