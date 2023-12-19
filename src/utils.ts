import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';
import { ProductViewModel } from './models';
import { ProductType, RoleType } from './types';
import { SECRET_KEY } from './config';

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

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });
};
