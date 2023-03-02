import Router from "express";
import { typeAdditionController } from "../controllers/typeAdditionRouter.js";
import authMiddleware from "../middleware/authMiddleware.js";
const typeAdditionRouter = Router();

typeAdditionRouter.get("/", typeAdditionController.getAllTypeAdditions);
typeAdditionRouter.get(
  "/:typeId",
  typeAdditionController.getTypeAdditionByTypeId
);
typeAdditionRouter.post("/", typeAdditionController.createTypeAddition);
typeAdditionRouter.delete(
  "/:id",
  authMiddleware,
  typeAdditionController.deleteTypeAddition
);

export default typeAdditionRouter;
