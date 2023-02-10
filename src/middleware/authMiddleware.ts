import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { tokenService } from "../services/tokenService.js";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    const authorizatonHeader = req.headers.authorization;
    if (!authorizatonHeader) {
      return next(ApiError.UnauthorizerError());
    }
    const accessToken = authorizatonHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizerError());
    }
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizerError());
    }
    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizerError());
  }
}
