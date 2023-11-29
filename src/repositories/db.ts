import { MongoClient, ServerApiVersion } from 'mongodb';
import { ProductType } from '../types';
import 'dotenv/config';

const user = process.env.mongodb_user;
const passwort = process.env.mongodb_passwort;
const uri = `mongodb+srv://${user}:${passwort}@cluster0.oqfu7vk.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const productCollection = client
  .db('shop')
  .collection<ProductType>('products');

export async function runDb() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.log(error);
    await client.close();
  }
}
