import Router from "express";
import { productController } from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const productRouter = Router();

productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getProductById);
productRouter.get("/type/:typeId", productController.getProductsByTypeId);
productRouter.post("/", authMiddleware, productController.createProduct);
productRouter.delete("/:id", authMiddleware, productController.deleteProduct);
productRouter.put("/:id", authMiddleware, productController.putProduct);

export default productRouter;
