import Router from "express";
import { basketItemController } from "../controllers/basketItemsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const basketItemsRouter = Router();

basketItemsRouter.get(
  "/order/:orderId",
  basketItemController.getAllBasketItemsByOrderId
);
basketItemsRouter.get(
  "/:basketId",
  basketItemController.getAllBasketItemsByBasketId
);
basketItemsRouter.post("/", basketItemController.addToBasketItems);
basketItemsRouter.delete(
  "/:id",
  authMiddleware,
  basketItemController.deleteBasketItem
);

export default basketItemsRouter;
