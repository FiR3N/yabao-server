import { NextFunction, Request, Response } from "express";
import {
  BasketItemModel,
  OrderModal,
  ProductModel,
  PromocodesModel,
} from "../models/models.js";
class OrderController {
  async getOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderModal.findAll();
      return res.status(200).json(orders);
    } catch (e: any) {
      next(e);
    }
  }
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      let { basketId, address, promocodeId } = req.body;
      promocodeId = promocodeId || null;
      const basketItems = await BasketItemModel.findAll({
        where: { $basketId$: basketId, $orderId$: null },
        include: ProductModel,
      });
      let totalPrice: number = basketItems.reduce(
        (totalPrice: number, item: any) =>
          (totalPrice +=
            (item?.ProductModel.isDiscount
              ? Number(item?.ProductModel.discountedPrice)
              : Number(item?.ProductModel.price)) * item?.count),
        0
      );

      const promo = await PromocodesModel.findOne({
        where: { $id$: promocodeId },
      });
      if (promo) {
        totalPrice = totalPrice - totalPrice * promo.rebate;
      }
      console.log(promocodeId);
      console.log(promo);
      console.log(totalPrice);
      const order = await OrderModal.create({
        basketId,
        totalPrice,
        address: address,
        orderTypeId: 1,
        promocodeID: promocodeId,
      });
      await BasketItemModel.update(
        { orderId: order.id },
        { where: { $basketId$: basketId, $orderId$: null } }
      );
      return res.status(201).json(order);
    } catch (e: any) {
      next(e);
    }
  }
  async putOrderType(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderId, orderTypeId } = req.params;
      await OrderModal.findOne({
        where: { id: orderId, $orderTypeId$: orderTypeId },
      });
      return res.status(200).json(`Order id: ${orderId} was changed`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const orderController = new OrderController();
