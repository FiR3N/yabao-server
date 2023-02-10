import Router from "express";
import { typeAdditionController } from "../controllers/typeAdditionRouter.js";
const typeAdditionRouter = Router();

typeAdditionRouter.get("/", typeAdditionController.getAllTypeAdditions);
typeAdditionRouter.get("/:id", typeAdditionController.getTypeAdditionById);
typeAdditionRouter.post("/", typeAdditionController.createTypeAddition);
typeAdditionRouter.delete("/:id", typeAdditionController.deleteTypeAddition);

export default typeAdditionRouter;
