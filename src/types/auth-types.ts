import { JwtPayload } from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { RoleModel } from '.';

export interface TokenModel {
  user: ObjectId;
  refreshToken: string;
}

export interface CustomJwtPayload extends JwtPayload {
  email: string;
  roles: Array<RoleModel['value']>;
  isActivated: boolean;
}
