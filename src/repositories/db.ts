import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config';
import { ProductModel } from '../types';
import { RoleModel, TokenModel, UserModel } from '../models';

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
  .collection<ProductModel>('products');

export const roleCollection = client.db('shop').collection<RoleModel>('roles');
export const userCollection = client.db('shop').collection<UserModel>('users');
export const tokenCollection = client
  .db('shop')
  .collection<TokenModel>('tokens');

export async function runDb() {
  try {
    await client.connect();
    const doc = await client.db('admin').command({ ping: 1 });
    console.log(
      '\x1b[35m%s\x1b[0m',
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.log(error);
    await client.close();
  }
}
