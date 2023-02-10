import { NextFunction, Request, Response } from "express";
import { BasketItemModel } from "../models/models.js";
class BasketItemController {
  async addToBasketItems(req: Request, res: Response, next: NextFunction) {
    try {
      const { basketId, productId, count } = req.body;
      const basketItem = await BasketItemModel.create({
        basketId,
        productId,
        orderId: null,
        count,
      });
      return res.status(201).json(basketItem);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllBasketItemsByBasketId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { basketId } = req.params;
      const basketItems = await BasketItemModel.findAll({
        where: { basketId: basketId },
      });
      return res.status(200).json(basketItems);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllBasketItemsByOrderId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { orderId } = req.params;
      const basketItems = await BasketItemModel.findAll({
        where: { orderId: orderId },
      });
      return res.status(200).json(basketItems);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteBasketItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await BasketItemModel.destroy({ where: { id: id } });
      return res.status(200).json(`Basket Item id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const basketItemController = new BasketItemController();
