import { ApiError } from '../exceptions/api-error';
import { productsRepo } from '../repositories/products-repo';
import {
  CreateProductDto,
  ProductModel,
  ProductViewModel,
  UpdateProductDto,
} from '../types';

export const productService = {
  async findProducts(title?: string) {
    const products = await productsRepo.findProducts(title);
    if (!products) {
      throw ApiError.ServerError('Internal Server Error');
    }
    return products;
  },

  async findProductById(id: string): Promise<ProductViewModel> {
    const product = await productsRepo.findProductById(id);
    if (!product) {
      throw ApiError.NotFound(`Product with id: ${id} wasn't found`);
    }
    return product;
  },

  async createProduct({
    FoodCategory,
    FoodItem,
    per100grams,
    Cals_per100grams,
    KJ_per100grams,
  }: CreateProductDto) {
    const candidate = await productsRepo.findProductByTitle(FoodItem);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Product with title ${FoodItem} already exists`,
        [
          {
            type: 'field',
            value: FoodItem,
            msg: 'product title must be unique',
            path: 'title',
            location: 'body',
          },
        ]
      );
    }
    const newProduct: ProductModel = {
      FoodCategory,
      FoodItem,
      per100grams,
      Cals_per100grams,
      KJ_per100grams,
    };
    const result = await productsRepo.createProduct(newProduct);
    if (!result.insertedId) throw ApiError.ServerError('Internal Server Error');

    return { ...newProduct, _id: result.insertedId };
  },

  async updateProduct(product: UpdateProductDto) {
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
