import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../exceptions/api-error';
import { CustomJwtPayload, UserInputModel, UserModel } from '../models';
import { usersRepo } from '../repositories';
import { getUserWithTokens, userModelMapper } from '../utils';
import mailService from './mail-service';
import tokenService from './token-service';
import { authRepo } from '../repositories/auth-repo';

class AuthService {
  async signup({ email, password: userPassword }: UserInputModel) {
    const candidate = await usersRepo.findUser('email', email);
    if (candidate) {
      throw ApiError.BadRequest(
        409,
        `User with email ${email} already exists`,
        [
          {
            type: 'field',
            value: email,
            msg: 'email address must be unique',
            path: 'email',
            location: 'body',
          },
        ]
      );
    }

    const userRole = await usersRepo.findRole('ADMIN');
    if (!userRole) throw ApiError.NotFound('User role not found');

    const hashPassword = await bcrypt.hash(userPassword, 7);
    const identifier = uuidv4();
    const newUser: UserModel = {
      email,
      password: hashPassword,
      roles: [userRole.value],
      activationLink: identifier,
      isActivated: false,
    };
    const { insertedId } = await authRepo.createUser(newUser);
    if (!insertedId) throw ApiError.ServerError('User was not inserted');
    await mailService.sendActivationMail(email, identifier);

    return userModelMapper({ ...newUser, _id: insertedId });
  }

  async login({ email, password: userPassword }: UserInputModel) {
    const currentUser = await usersRepo.findUser('email', email);
    if (!currentUser) {
      throw ApiError.BadRequest(404, 'Incorrect username or password');
    }
    const isPasswordValid = await bcrypt.compare(
      userPassword,
      currentUser.password
    );
    if (!isPasswordValid) {
      throw ApiError.BadRequest(404, 'Incorrect username or password');
    }
    if (!currentUser.isActivated || currentUser.activationLink) {
      throw ApiError.ForbiddenError('Account has not yet been activated');
    }
    return getUserWithTokens(currentUser);
  }

  async logout(refreshToken: string) {
    const { deletedCount } = await tokenService.removeToken(refreshToken);
    if (deletedCount !== 1) {
      throw ApiError.NotFound('Logout Error');
    }
  }

  async activate(activationLink: string) {
    const currentUser = await usersRepo.findUser(
      'activationLink',
      activationLink
    );
    if (!currentUser) {
      throw ApiError.BadRequest(400, 'Activation link is incorrect');
    }
    const result = await authRepo.activateUser(activationLink);

    if (!result.value) {
      throw ApiError.ServerError('User was not activated');
    }

    return getUserWithTokens(result.value);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData =
      tokenService.validateRefreshToken<CustomJwtPayload>(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }
    const currentUser = await usersRepo.findUser('email', userData.email);
    if (!currentUser) {
      throw ApiError.UnauthorizedError();
    }

    return getUserWithTokens(currentUser);
  }
}

export default new AuthService();
