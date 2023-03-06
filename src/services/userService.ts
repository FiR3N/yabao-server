import ApiError from "../exceptions/ApiError.js";
import { UserModel } from "../models/models.js";
import { compareSync } from "bcrypt";
import { UserDto } from "../dtos/UserDto.js";
import { tokenService } from "./tokenService.js";
import { hash } from "bcrypt";
import { v4 } from "uuid";
import { mailService } from "./mailService.js";
import { Op } from "sequelize";

class UserService {
  async login(email: string, password: string) {
    const user: UserModel | null = await UserModel.findOne({
      where: { email: email },
    });
    if (!user) {
      throw ApiError.BadRequest("Неверный email или пароль", []);
    }
    const isPassEquals = compareSync(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный email или пароль", []);
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async registration(
    email: string,
    password: string,
    repeatePassword: string,
    phone: string,
    name: string,
    surname: string
  ) {
    const candidate = await UserModel.findOne({
      where: { [Op.or]: [{ email: email }, { phone: phone }] },
    });
    if (candidate) {
      throw ApiError.BadRequest(
        "Пользователь с такой почтой или телефоном уже зарегистрирован",
        []
      );
    }
    if (password != repeatePassword) {
      throw ApiError.BadRequest("Пароли не совпадают", []);
    }
    const hashPassword = await hash(password, 5);
    const activationLink = v4();
    const user = await UserModel.create({
      email: email,
      password: hashPassword,
      phone: phone,
      name: name,
      surname: surname,
      activationLink: activationLink,
      isConfirmed: false,
      roleId: 1,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/users/activate/${activationLink}`
    );

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }
  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.UnauthorizerError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken) as UserDto;
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizerError();
    }
    const user = await UserModel.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken: string) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async activate(activationLink: string) {
    const user = await UserModel.findOne({
      where: { activationLink: activationLink },
    });
    if (!user) {
      throw ApiError.BadRequest("Некорректная ссылка активации", []);
    }
    user.isConfirmed = true;
    await user.save();
  }
}

export const userService = new UserService();
