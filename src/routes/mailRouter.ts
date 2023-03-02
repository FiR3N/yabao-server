import Router, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import ApiError from "../exceptions/ApiError.js";
import { mailService } from "../services/mailService.js";
const mailRouter = Router();

mailRouter.post(
  "/",
  body("email").isEmail(),
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const erros = validationResult(req);
      if (!erros.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", erros.array()));
      }
      const { email, theme, text } = req.body;
      mailService.sendMessageFromUser(email, theme, text);
      return res.status(200).json("Message sent");
    } catch (e: any) {
      return res.status(400).json("Something wrong");
    }
  }
);

export default mailRouter;
