import Router from "express";
import { newsController } from "../controllers/newsController.js";
const newsRouter = Router();

newsRouter.get("/", newsController.getAllNews);
newsRouter.get("/:id", newsController.getNewsById);
newsRouter.post("/", newsController.createNews);
newsRouter.delete("/:id", newsController.deleteNews);
newsRouter.put("/:id", newsController.putNews);

export default newsRouter;
