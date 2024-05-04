import { ObjectId } from 'mongodb';
import { productCollection } from '.';
import { ProductModel, UpdateProductDto } from '../types';

export const productsRepo = {
  async findProducts(title?: string) {
    const filter: { name?: Record<'$regex', string> } = {};
    if (title) {
      filter.name = { $regex: title };
    }
    return await productCollection.find(filter).toArray();
  },

  async findProductById(id: string) {
    return await productCollection.findOne({ _id: new ObjectId(id) });
  },

  async findProductByTitle(title: string) {
    return await productCollection.findOne({ name: title });
  },

  async createProduct(product: ProductModel) {
    return await productCollection.insertOne(product);
  },

  async updateProduct({
    _id,
    FoodCategory,
    FoodItem,
    per100grams,
    Cals_per100grams,
    KJ_per100grams,
  }: UpdateProductDto) {
    return await productCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          FoodCategory,
          FoodItem,
          per100grams,
          Cals_per100grams,
          KJ_per100grams,
        },
      }
    );
  },

  async deleteProduct(id: string) {
    return await productCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
