import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { ApiError } from '../exceptions/api-error';
import { tokenCollection } from '../repositories';
import { UserViewModel } from '../types';

class TokenService {
  generateTokens(payload: UserViewModel) {
    if (!process.env.JWT_ACCESS_SECRET || !process.env.JWT_REFRESH_SECRET)
      throw ApiError.ServerError('Internal Server Error');
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: '15s',
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: '30s',
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken<T>(token: string) {
    if (!process.env.JWT_ACCESS_SECRET)
      throw ApiError.ServerError('Internal Server Error');
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as T;
      return userData;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken<T>(token: string) {
    if (!process.env.JWT_REFRESH_SECRET)
      throw ApiError.ServerError('Internal Server Error');
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET) as T;
      return userData;
    } catch (error) {
      return null;
    }
  }

  async saveToken(userId: ObjectId, refreshToken: string) {
    const tokenData = await tokenCollection.findOne({ user: userId });
    if (tokenData) {
      return await tokenCollection.updateOne(
        { user: userId },
        { $set: { refreshToken } }
      );
    }
    const token = await tokenCollection.insertOne({
      user: userId,
      refreshToken,
    });
    return token;
  }

  async removeToken(refreshToken: string) {
    return await tokenCollection.deleteOne({ refreshToken });
  }

  async findToken(refreshToken: string) {
    return await tokenCollection.findOne({ refreshToken });
  }
}

export default new TokenService();
