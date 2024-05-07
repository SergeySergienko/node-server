export interface GetProductParamsDto {
  id: string;
}

export interface GetProductsQueryDto {
  title?: string;
  limit?: string;
}

export interface ProductModel {
  category: string;
  name: string;
  units: string;
  caloriesPer100g: number;
  kjPer100g: number;
}
