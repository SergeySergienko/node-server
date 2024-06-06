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

export type RoleModel = {
  value: 'USER' | 'ADMIN' | 'OWNER';
};
