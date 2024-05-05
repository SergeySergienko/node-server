import { WithId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { productsRepo } from '../repositories/products-repo';
import { ProductModel } from '../types';

export const productService = {
  async findProducts(title?: string) {
    const products = await productsRepo.findProducts(title);
    if (!products) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return products;
  },

  async findProductById(id: string): Promise<WithId<ProductModel>> {
    const product = await productsRepo.findProductById(id);
    if (!product) {
      throw ApiError.NotFound(`Product with id: ${id} wasn't found`);
    }
    return product;
  },

  async createProduct({
    category,
    name,
    units,
    caloriesPer100g,
    kjPer100g,
  }: ProductModel): Promise<WithId<ProductModel>> {
    const candidate = await productsRepo.findProductByTitle(name);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Product with title ${name} already exists`,
        [
          {
            type: 'field',
            value: name,
            msg: 'product title must be unique',
            path: 'title',
            location: 'body',
          },
        ]
      );
    }
    const newProduct = {
      category,
      name,
      units,
      caloriesPer100g,
      kjPer100g,
    };
    const result = await productsRepo.createProduct(newProduct);
    if (!result.insertedId) throw ApiError.ServerError('Internal Server Error');

    return { ...newProduct, _id: result.insertedId };
  },

  async updateProduct(product: WithId<ProductModel>) {
    const result = await productsRepo.updateProduct(product);
    if (result.matchedCount !== 1) {
      throw ApiError.NotFound(`Product with id: ${product._id} wasn't found`);
    }
    return product;
  },

  async deleteProduct(id: string) {
    const result = await productsRepo.deleteProduct(id);
    if (result.deletedCount !== 1) {
      throw ApiError.NotFound(`Product with id: ${id} wasn't found`);
    }
    return id;
  },
};
