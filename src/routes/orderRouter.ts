import Router from "express";
import { orderController } from "../controllers/orderController.js";
const orderRouter = Router();

orderRouter.get("/");
orderRouter.get("/:id");
orderRouter.post("/", orderController.createOrder);
orderRouter.delete("/:id");
orderRouter.put("/:id");

export default orderRouter;
