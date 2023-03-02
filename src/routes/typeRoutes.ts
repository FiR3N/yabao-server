import Router from "express";
import { typeController } from "../controllers/typeController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const typeRouter = Router();

typeRouter.get("/", typeController.getAllTypes);
typeRouter.get("/:id", typeController.getTypeById);
typeRouter.post("/", authMiddleware, typeController.createType);
typeRouter.delete("/:id", authMiddleware, typeController.deleteType);

export default typeRouter;
