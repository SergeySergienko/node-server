import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from '../exceptions/api-error';
import { roleCollection, userCollection } from '../repositories';
import { CustomJwtPayload, RoleModel, UserDto, UserModel } from '../types';
import mailService from './mail-service';
import tokenService from './token-service';

class AuthService {
  async signup({ email, password: userPassword }: UserDto) {
    const candidate = await userCollection.findOne({ email });
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
    const userRole = await roleCollection.findOne({
      value: 'OWNER',
    });
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
    const { insertedId } = await userCollection.insertOne(newUser);
    if (!insertedId) throw ApiError.ServerError('Internal Server Error');

    await mailService.sendActivationMail(email, identifier);
    const { password, ...user } = newUser;
    const tokens = tokenService.generateTokens({
      ...user,
      _id: insertedId,
    });
    await tokenService.saveToken(insertedId, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async login({ email, password: userPassword }: UserDto) {
    const currentUser = await userCollection.findOne({ email });
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
    const { password, ...user } = currentUser;
    const tokens = tokenService.generateTokens(user);
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }

  async logout(refreshToken: string) {
    return await tokenService.removeToken(refreshToken);
  }

  async activate(activationLink: string) {
    const user = await userCollection.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest(400, 'Activation link is incorrect');
    }
    const result = await userCollection.updateOne(
      { activationLink },
      { $set: { isActivated: true }, $unset: { activationLink: '' } }
    );
    return result.matchedCount === 1;
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
    const user = await userCollection.findOne({ email: userData.email });
    if (!user) {
      throw ApiError.UnauthorizedError();
    }

    const tokens = tokenService.generateTokens(user);
    await tokenService.saveToken(user._id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
}

export default new AuthService();
