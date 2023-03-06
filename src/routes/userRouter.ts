import Router from "express";
import { body } from "express-validator";
import { userController } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post(
  "/login",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.login
);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/", userController.getUsers);
userRouter.get("/user/:id", userController.getUserById);
userRouter.post("/reg", userController.registration);
userRouter.post("/logout", userController.logout);
userRouter.post(
  "/send-activation-message",
  userController.sendActivationMessage
);
userRouter.post("/:id", userController.updateUserById);

export default userRouter;
