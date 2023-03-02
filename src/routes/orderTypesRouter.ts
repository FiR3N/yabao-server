import Router from "express";
import { orderTypeController } from "../controllers/orderTypeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const orderTypesRouter = Router();

orderTypesRouter.get("/", orderTypeController.getAllOrderTypes);
orderTypesRouter.get("/:id", orderTypeController.getOrderTypeById);
orderTypesRouter.post("/", authMiddleware, orderTypeController.createOrderType);
orderTypesRouter.delete(
  "/:id",
  authMiddleware,
  orderTypeController.deleteOrderType
);

export default orderTypesRouter;
