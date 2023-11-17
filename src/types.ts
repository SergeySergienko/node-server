import { Request } from 'express';

export type ProductType = {
  id: number;
  title: string;
  price: number;
};

export type DBType = {
  products: ProductType[];
};

export type RequestWithParams<T> = Request<T>;
export type RequestWithBody<T> = Request<{}, {}, T>;
export type RequestWithQuery<T> = Request<{}, {}, {}, T>;
