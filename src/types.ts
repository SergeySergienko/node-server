import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export type ProductType = {
  id: number;
  title: string;
  price: number;
};

export type RoleType = {
  value: 'USER' | 'ADMIN';
};

export type UserType = {
  username: string;
  password: string;
  role: Array<RoleType['value']>;
};

export type DBType = {
  products: ProductType[];
};

export type RequestWithParams<T> = Request<T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;

export interface CustomRequest extends Request {
  token: string | JwtPayload;
}
export interface CustomJwtPayload extends JwtPayload {
  roles: Array<RoleType['value']>;
}
