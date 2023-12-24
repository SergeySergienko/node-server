import { ObjectId } from 'mongodb';
import { UserModel } from './UserModel';

export interface TokenModel {
  user: ObjectId;
  refreshToken: string;
}
