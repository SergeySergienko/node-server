import { WithId } from 'mongodb';
import { Response } from 'express';

import { UserModel, UserOutputModel } from './models';
import tokenService from './services/token-service';

export const userModelMapper = ({
  _id,
  email,
  roles,
  isActivated,
  activationLink,
}: WithId<UserModel>): UserOutputModel => ({
  id: _id.toString(),
  email: email,
  roles: roles,
  isActivated: isActivated,
  activationLink: activationLink,
});

export const setCookie = (
  res: Response,
  cookieName: string,
  cookieValue: string
) =>
  res.cookie(cookieName, cookieValue, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: 'none',
  });

export const getUserWithTokens = async (userData: WithId<UserModel>) => {
  const user = userModelMapper(userData);
  const tokens = tokenService.generateTokens(user);
  await tokenService.saveToken(user.id, tokens.refreshToken);

  return {
    ...tokens,
    user,
  };
};
