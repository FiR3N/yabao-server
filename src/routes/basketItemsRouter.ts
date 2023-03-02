import Router from "express";
import { basketItemController } from "../controllers/basketItemsController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const basketItemsRouter = Router();

basketItemsRouter.get(
  "/:orderId",
  basketItemController.getAllBasketItemsByOrderId
);
basketItemsRouter.get(
  "/:basketId",
  basketItemController.getAllBasketItemsByBasketId
);
basketItemsRouter.post(
  "/",
  authMiddleware,
  basketItemController.addToBasketItems
);
basketItemsRouter.delete(
  "/:id",
  authMiddleware,
  basketItemController.deleteBasketItem
);

export default basketItemsRouter;
