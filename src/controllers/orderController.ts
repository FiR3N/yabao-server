import { NextFunction, Request, Response } from "express";
import { BasketItemModel, OrderModal, ProductModel } from "../models/models.js";
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
      const { basketId, address } = req.body;
      const basketItems = await BasketItemModel.findAll({
        where: { $basketId$: basketId, $orderId$: null },
        include: ProductModel,
      });
      const totalPrice: number = basketItems.reduce(
        (totalPrice: number, item: any) =>
          (totalPrice +=
            (item.isDiscount
              ? Number(item.discountedPrice)
              : Number(item.price)) * item.count),
        0
      );
      const order = await OrderModal.create({
        basketId,
        totalPrice,
        address: address,
        orderTypeId: 1,
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
