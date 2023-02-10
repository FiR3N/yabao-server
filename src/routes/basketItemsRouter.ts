import Router from "express";
import { basketItemController } from "../controllers/basketItemsController.js";
const basketItemsRouter = Router();

basketItemsRouter.get("/");
basketItemsRouter.get("/:id");
basketItemsRouter.post("/", basketItemController.addToBasketItems);
basketItemsRouter.delete("/:id");
basketItemsRouter.put("/:id");

export default basketItemsRouter;
