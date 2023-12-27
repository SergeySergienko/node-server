import { ObjectId } from 'mongodb';

export interface GetProductParamsDto {
  id: string;
}

export interface GetProductsQueryDto {
  title?: string;
}

export interface CreateProductDto {
  title: string;
  price: number;
}

export interface UpdateProductDto {
  _id: ObjectId;
  title: string;
  price: number;
}

export interface ProductModel {
  title: string;
  price: number;
}

export interface ProductViewModel {
  _id: ObjectId;
  title: string;
  price: number;
}
