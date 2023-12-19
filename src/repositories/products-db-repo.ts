import { ProductType } from '../types';
import { getProductViewModel } from '../utils';
import { productCollection } from './db';

export const productsRepo = {
  async findProducts(title?: string) {
    const filter: { title?: Record<'$regex', string> } = {};
    if (title) {
      filter.title = { $regex: title };
    }

    return await productCollection.find(filter).toArray();
  },

  async findProductsById(id: number) {
    return await productCollection.findOne({ id });
  },

  async createProduct(product: ProductType) {
    const result = await productCollection.insertOne(product);

    return result.insertedId ? product : null;
  },

  async updateProduct(product: ProductType) {
    const result = await productCollection.replaceOne(
      { id: product.id },
      product
    );

    return result.matchedCount === 1;
  },

  async deleteProduct(id: number) {
    const result = await productCollection.deleteOne({ id });

    return result.deletedCount === 1;
  },
};
