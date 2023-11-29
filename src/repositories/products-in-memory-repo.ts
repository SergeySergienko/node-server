import { db } from '../db/db';
import { ProductType } from '../types';
import { getProductViewModel } from '../utils';

export const productsRepo = {
  async findProducts(title?: string) {
    let foundProducts = db.products;
    if (title) {
      foundProducts = db.products.filter((p) => p.title.includes(title));
    }

    return foundProducts.map(getProductViewModel);
  },

  async findProductsById(id: string) {
    const product = db.products.find((p) => p.id === +id);
    if (!product) return;

    return getProductViewModel(product);
  },

  async createProduct(title: string) {
    const newProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    db.products.push(newProduct);

    return getProductViewModel(newProduct);
  },
};
