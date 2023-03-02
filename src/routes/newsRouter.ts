import Router from "express";
import { newsController } from "../controllers/newsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const newsRouter = Router();

newsRouter.get("/", newsController.getAllNews);
newsRouter.get("/:id", newsController.getNewsById);
newsRouter.post("/", newsController.createNews);
newsRouter.delete("/:id", authMiddleware, newsController.deleteNews);
newsRouter.put("/:id", authMiddleware, newsController.putNews);

export default newsRouter;
