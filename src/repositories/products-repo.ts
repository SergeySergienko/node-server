import { ObjectId } from 'mongodb';
import { ProductModel, UpdateProductDto } from '../types';
import { productCollection } from './db';

export const productsRepo = {
  async findProducts(title?: string) {
    const filter: { title?: Record<'$regex', string> } = {};
    if (title) {
      filter.title = { $regex: title };
    }
    return await productCollection.find(filter).toArray();
  },

  async findProductById(id: string) {
    return await productCollection.findOne({ _id: new ObjectId(id) });
  },

  async findProductByTitle(title: string) {
    return await productCollection.findOne({ title });
  },

  async createProduct(product: ProductModel) {
    return await productCollection.insertOne(product);
  },

  async updateProduct({ _id, price, title }: UpdateProductDto) {
    return await productCollection.updateOne(
      { _id: new ObjectId(_id) },
      { $set: { price, title } }
    );
  },

  async deleteProduct(id: string) {
    return await productCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
