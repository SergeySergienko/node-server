import { ProductViewModel } from './models';
import { ProductType } from './types';

export const getProductViewModel = ({
  id,
  title,
}: ProductType): ProductViewModel => ({
  id,
  title,
});
