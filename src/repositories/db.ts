import { MongoClient, ServerApiVersion } from 'mongodb';
import { ProductType, RoleType, UserType } from '../types';
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

export const roleCollection = client.db('shop').collection<RoleType>('roles');
export const userCollection = client.db('shop').collection<UserType>('users');

export async function runDb() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log(
      '\x1b[35m%s\x1b[0m',
      'Pinged your deployment. You successfully connected to MongoDB!'
    );
  } catch (error) {
    console.log(error);
    await client.close();
  }
}
