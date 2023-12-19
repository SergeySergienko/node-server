import { productsRepo } from '../repositories/products-db-repo';
import { ProductType } from '../types';
import { getProductViewModel } from '../utils';

export const productSevice = {
  async findProducts(title?: string) {
    return productsRepo.findProducts(title);
  },

  async findProductsById(id: number) {
    return productsRepo.findProductsById(id);
  },

  async createProduct(title: string) {
    const products = await this.findProducts();
    const isExist = products.some((p) => p.title === title);
    if (isExist) {
      return '409';
    }
    const newProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    const result = await productsRepo.createProduct(newProduct);

    return result && getProductViewModel(result);
  },

  async updateProduct(product: ProductType) {
    const result = await productsRepo.updateProduct(product);

    return result && getProductViewModel(product);
  },

  async deleteProduct(id: number) {
    const result = await productsRepo.deleteProduct(id);

    return result;
  },
};
