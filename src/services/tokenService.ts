import jwt from "jsonwebtoken";
import ApiError from "../exceptions/ApiError.js";
import { TokenModel } from "../models/models.js";

class TokenService {
  generateTokens(payload: any) {
    const accessToken = jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET_KEY as string,
      {
        expiresIn: "30m",
      }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET_KEY as string,
      {
        expiresIn: "30d",
      }
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token: any) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_ACCESS_SECRET_KEY as string
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  validateRefreshToken(token: any) {
    try {
      const userData = jwt.verify(
        token,
        process.env.JWT_REFRESH_SECRET_KEY as string
      );
      return userData;
    } catch (e) {
      return null;
    }
  }

  async saveToken(userId: number, refreshToken: any) {
    const tokenData = await TokenModel.findOne({
      where: { $userId$: userId },
    });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ refreshToken, userId });
    return token;
  }

  async removeToken(refreshToken: any) {
    const tokenData = await TokenModel.destroy({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }

  async findToken(refreshToken: any) {
    const tokenData = await TokenModel.findOne({
      where: { refreshToken: refreshToken },
    });
    return tokenData;
  }
}

export const tokenService = new TokenService();
