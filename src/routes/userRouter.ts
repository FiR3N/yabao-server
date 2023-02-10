import Router from "express";
import { userController } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const userRouter = Router();

userRouter.post("/login", userController.login);
userRouter.post("/reg", userController.registration);
userRouter.post("/logout", userController.logout);
userRouter.get("/refresh", userController.refresh);
userRouter.get("/activate/:link", userController.activate);
userRouter.get("/users", authMiddleware);

export default userRouter;
