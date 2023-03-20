import Router from "express";
import { promocodesController } from "../controllers/promocodesController.js";
import authMiddleware from "../middleware/authMiddleware.js";
const promocodesRouter = Router();

promocodesRouter.get("/", authMiddleware, promocodesController.getAllPromos);
promocodesRouter.get("/:id", promocodesController.getPromoById);
promocodesRouter.post("/", authMiddleware, promocodesController.createPromo);
promocodesRouter.delete(
  "/:id",
  authMiddleware,
  promocodesController.deletePromo
);

export default promocodesRouter;
