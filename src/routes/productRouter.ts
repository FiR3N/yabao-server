import Router from "express";
import { productController } from "../controllers/productController.js";
const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.post("/", productController.createProduct);
productRouter.delete("/:id", productController.deleteProduct);
productRouter.put("/:id", productController.putProduct);

export default productRouter;
