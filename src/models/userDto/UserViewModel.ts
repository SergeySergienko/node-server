import { RoleType } from '../../types';

export type UserViewModel = {
  username: string;
  role: Array<RoleType['value']>;
};
export type UserErrorModel = { errorMessage: string };
