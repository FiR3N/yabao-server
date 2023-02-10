import Router from "express";
import { typeController } from "../controllers/typeController.js";
const typeRouter = Router();

typeRouter.get("/", typeController.getAllTypes);
typeRouter.get("/:id", typeController.getTypeById);
typeRouter.post("/", typeController.createType);
typeRouter.delete("/:id", typeController.deleteType);

export default typeRouter;
