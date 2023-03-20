import Router from "express";
import basketItemsRouter from "./basketItemsRouter.js";
import mailRouter from "./mailRouter.js";
import newsRouter from "./newsRouter.js";
import orderRouter from "./orderRouter.js";
import orderTypesRouter from "./orderTypesRouter.js";
import productRouter from "./productRouter.js";
import promocodesRouter from "./promocodesRouter.js";
import typeAdditionRouter from "./typeAdditionRouter.js";
import typeRouter from "./typeRoutes.js";
import userRouter from "./userRouter.js";
const router = Router();

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/types", typeRouter);
router.use("/news", newsRouter);
router.use("/types-additions", typeAdditionRouter);
router.use("/orders", orderRouter);
router.use("/orders-types", orderTypesRouter);
router.use("/basket-items", basketItemsRouter);
router.use("/mail", mailRouter);
router.use("/promocodes", promocodesRouter);

export default router;
