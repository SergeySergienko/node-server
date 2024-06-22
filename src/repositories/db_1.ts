import {
  Collection,
  Db,
  Document,
  MongoClient,
  ServerApiVersion,
} from 'mongodb';
import { ProductModel } from '../types';
import { RoleModel, TokenModel, UserModel } from '../models';
import { uri, database_url } from './constants';

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export let productCollection: Collection<ProductModel>;
export let roleCollection: Collection<RoleModel>;
export let userCollection: Collection<UserModel>;
export let tokenCollection: Collection<TokenModel>;
export let uploadsDB: Db;
export let imageCollection: Collection<Document>;

export async function runDb_1() {
  try {
    await client.connect();
    console.log(
      '\x1b[35m%s\x1b[0m',
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // const doc = await client.db('admin').command({ ping: 1 });
    productCollection = client.db('shop').collection<ProductModel>('foods');

    roleCollection = client.db('shop').collection<RoleModel>('roles');
    userCollection = client.db('shop').collection<UserModel>('users');
    tokenCollection = client.db('shop').collection<TokenModel>('tokens');
    uploadsDB = client.db('uploads');
    imageCollection = uploadsDB.collection('images.files');
  } catch (error) {
    console.log(error);
    await client.close();
  }
}
