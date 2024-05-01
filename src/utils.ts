import { WithId } from 'mongodb';
import { UserModel, UserOutputModel } from './models';

export const userModelMapper = (user: WithId<UserModel>): UserOutputModel => ({
  id: user._id.toString(),
  email: user.email,
  roles: user.roles,
  isActivated: user.isActivated,
  activationLink: user.activationLink,
});
