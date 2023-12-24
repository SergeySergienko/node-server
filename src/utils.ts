import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { ProductViewModel } from './models/productDto';
import { ProductType, RoleType } from './types';
import { JWT_ACCESS_SECRET } from './config';

export const getProductViewModel = ({
  id,
  title,
}: ProductType): ProductViewModel => ({
  id,
  title,
});

export const generateAccessToken = (
  id: ObjectId,
  roles: Array<RoleType['value']>
) => {
  const payload = { id, roles };

  return jwt.sign(payload, JWT_ACCESS_SECRET, { expiresIn: '24h' });
};
