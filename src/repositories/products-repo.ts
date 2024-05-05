import { ObjectId, WithId } from 'mongodb';
import { productCollection } from '.';
import { ProductModel } from '../types';

export const productsRepo = {
  async findProducts(title?: string) {
    const filter: { name?: {} } = {};
    if (title) {
      filter.name = { $regex: title, $options: 'i' };
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
    category,
    name,
    units,
    caloriesPer100g,
    kjPer100g,
  }: WithId<ProductModel>) {
    return await productCollection.updateOne(
      { _id: new ObjectId(_id) },
      {
        $set: {
          category,
          name,
          units,
          caloriesPer100g,
          kjPer100g,
        },
      }
    );
  },

  async deleteProduct(id: string) {
    return await productCollection.deleteOne({ _id: new ObjectId(id) });
  },
};
