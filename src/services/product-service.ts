import { ApiError } from '../exceptions/api-error';
import { productsRepo } from '../repositories/products-repo';
import {
  CreateProductDto,
  ProductModel,
  ProductViewModel,
  UpdateProductDto,
} from '../types';

export const productSevice = {
  async findProducts(title?: string) {
    const products = productsRepo.findProducts(title);
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

  async createProduct({ title, price }: CreateProductDto) {
    const candidate = await productsRepo.findProductByTitle(title);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `Product with title ${title} already exists`,
        [
          {
            type: 'field',
            value: title,
            msg: 'product title must be unique',
            path: 'title',
            location: 'body',
          },
        ]
      );
    }
    const newProduct: ProductModel = {
      title,
      price,
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
