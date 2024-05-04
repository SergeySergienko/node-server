import { ObjectId } from 'mongodb';

export interface GetProductParamsDto {
  id: string;
}

export interface GetProductsQueryDto {
  title?: string;
}

export interface CreateProductDto {
  FoodCategory: string;
  FoodItem: string;
  per100grams: string;
  Cals_per100grams: string;
  KJ_per100grams: string;
}

export interface UpdateProductDto {
  _id: ObjectId;
  FoodCategory: string;
  FoodItem: string;
  per100grams: string;
  Cals_per100grams: string;
  KJ_per100grams: string;
}

export interface ProductModel {
  FoodCategory: string;
  FoodItem: string;
  per100grams: string;
  Cals_per100grams: string;
  KJ_per100grams: string;
}

export interface ProductViewModel {
  _id: ObjectId;
  FoodCategory: string;
  FoodItem: string;
  per100grams: string;
  Cals_per100grams: string;
  KJ_per100grams: string;
}
