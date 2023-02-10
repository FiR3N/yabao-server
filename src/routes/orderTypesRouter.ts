import Router from "express";
import { orderTypeController } from "../controllers/orderTypeController.js";
const orderTypesRouter = Router();

orderTypesRouter.get("/", orderTypeController.getAllOrderTypes);
orderTypesRouter.get("/:id", orderTypeController.getOrderTypeById);
orderTypesRouter.post("/", orderTypeController.createOrderType);
orderTypesRouter.delete("/:id", orderTypeController.deleteOrderType);

export default orderTypesRouter;
