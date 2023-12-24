import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET } from '../config';
import { UserViewModel } from '../models/userDto/UserViewModel';
import { tokenCollection } from '../repositories';

class TokenService {
  generateTokens(payload: UserViewModel) {
    const accessToken = jwt.sign(payload, JWT_ACCESS_SECRET, {
      expiresIn: '30m',
    });
    const refreshToken = jwt.sign(payload, JWT_REFRESH_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken, refreshToken };
  }

  validateAccessToken<T>(token: string) {
    try {
      const userData = jwt.verify(token, JWT_ACCESS_SECRET);
      return userData as T;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken<T>(token: string) {
    try {
      const userData = jwt.verify(token, JWT_REFRESH_SECRET);
      return userData as T;
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
