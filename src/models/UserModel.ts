export interface UserModel {
  email: string;
  password: string;
  roles: Array<RoleModel['value']>;
  isActivated: boolean;
  activationLink?: string;
}

export interface UserInputModel {
  email: string;
  password: string;
}

export interface UserOutputModel extends Omit<UserModel, 'password'> {
  id: string;
}

export interface UserUpdateModel {
  id: string;
  roles: Array<RoleModel['value']>;
}

export type RoleModel = {
  value: 'USER' | 'ADMIN' | 'OWNER';
};
