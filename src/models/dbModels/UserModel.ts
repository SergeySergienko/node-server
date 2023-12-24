export interface UserModel {
  email: string;
  password: string;
  roles: Array<'USER' | 'ADMIN'>;
  isActivated: boolean;
  activationLink?: string;
}
