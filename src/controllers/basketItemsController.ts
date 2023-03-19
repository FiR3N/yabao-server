import { NextFunction, Request, Response } from "express";
import { BasketItemModel, ProductModel } from "../models/models.js";
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
        where: { basketId: basketId, $orderId$: null },
        include: [
          {
            model: ProductModel,
          },
        ],
      });
      return res.status(200).json(basketItems);
    } catch (e: any) {
      console.log(e.message);
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
  async putCountOfBasketItem(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { count } = req.body;
      const item = await BasketItemModel.findOne({ where: { id: id } });
      await BasketItemModel.update({ count: count }, { where: { id: id } });
      return res.status(200).json(item);
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
  async deleteBasketItemByBasketIdAndProductId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { basketId, productId } = req.params;
      const basketItem = await BasketItemModel.findOne({
        where: { basketId: basketId, productId: productId },
      });
      await BasketItemModel.destroy({
        where: { basketId: basketId, productId: productId },
      });
      return res.status(200).json(basketItem);
    } catch (e: any) {
      next(e);
    }
  }
}

export const basketItemController = new BasketItemController();
