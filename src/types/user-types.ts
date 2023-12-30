import { ObjectId } from 'mongodb';

export interface UserDto {
  email: string;
  password: string;
}

export interface UserModel extends UserDto {
  roles: Array<RoleModel['value']>;
  isActivated: boolean;
  activationLink?: string;
}

export interface UserViewModel extends Omit<UserModel, 'password'> {
  _id: ObjectId;
}

export interface RoleModel {
  value: 'USER' | 'ADMIN' | 'OWNER';
}
