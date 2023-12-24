import { Request, Response } from 'express';

import {
  CreateProductDto,
  ProductViewModel,
  ProductErrorModel,
  GetProductParamsDto,
  UpdateProductDto,
} from '../models/productDto';
import { productSevice } from '../services';
import { RequestWithBody, RequestWithParams } from '../types';

class ProductsController {
  async createProduct(
    req: RequestWithBody<CreateProductDto>,
    res: Response<ProductViewModel | ProductErrorModel>
  ) {
    if (!req.body.title) {
      res.sendStatus(400);
      return;
    }
    const product = await productSevice.createProduct(req.body.title);
    if (!product) {
      res.sendStatus(500);
    } else if (product === '409') {
      res
        .status(409)
        .json({ errorMessage: 'Product with this title already exists' });
    } else {
      res.status(201).json(product);
    }
  }

  async updateProduct(
    req: RequestWithBody<UpdateProductDto>,
    res: Response<ProductViewModel>
  ) {
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

  async deleteProduct(req: Request, res: Response) {
    const isDeleted = await productSevice.deleteProduct(+req.params.id);
    if (isDeleted) {
      res.status(204).send(`Product with id: ${req.params.id} was deleted.`);
    } else {
      res.status(404).send(`Product with id: ${req.params.id} wasn't found.`);
    }
  }
}

export default new ProductsController();
