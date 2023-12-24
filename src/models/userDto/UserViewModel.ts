import { ObjectId } from 'mongodb';
import { RoleType } from '../../types';

export type UserViewModel = {
  _id: ObjectId;
  email: string;
  roles: Array<RoleType['value']>;
  isActivated: boolean;
};
export type UserErrorModel = { errorMessage: string };
