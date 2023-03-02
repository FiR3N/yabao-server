import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { cookie, validationResult } from "express-validator";
import { userService } from "../services/userService.js";
import { BasketModel, UserModel } from "../models/models.js";
class UserController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
  async registration(req: Request, res: Response, next: NextFunction) {
    try {
      const erros = validationResult(req);
      if (!erros.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", erros.array()));
      }
      const { email, password, repeatePassword, phone, name, surname } =
        req.body;
      const userData = await userService.registration(
        email,
        password,
        repeatePassword,
        phone,
        name,
        surname
      );
      await BasketModel.create({ userId: userData.user.id });
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.json(userData);
    } catch (e: any) {
      next(e);
    }
  }
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activationLink = req.params.link;
      await userService.activate(activationLink);
      return res.redirect(process.env.CLIENT_URL as string);
    } catch (e) {
      next(e);
    }
  }
  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const user = await UserModel.findOne({ where: { $id$: id } });
      return res.json(user);
    } catch (e: any) {
      next(e);
    }
  }
  async updateUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, surname, phone } = req.body;
      await UserModel.update(
        { name: name, surname: surname, phone: phone },
        { where: { $id$: id } }
      );
      return res.status(200).json(`User id: ${id} was updated`);
    } catch (e: any) {
      next(e);
    }
  }
  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserModel.findAll();
      return res.json(users);
    } catch (e: any) {
      next(e);
    }
  }
}

export const userController = new UserController();
