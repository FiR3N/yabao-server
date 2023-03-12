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
basketItemsRouter.delete(
  "/basket/:basketId/product/:productId",
  authMiddleware,
  basketItemController.deleteBasketItemByBasketIdAndProductId
);
basketItemsRouter.put(
  "/:id",
  // authMiddleware,
  basketItemController.putCountOfBasketItem
);

export default basketItemsRouter;
