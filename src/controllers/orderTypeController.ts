import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { OrderTypeModel } from "../models/models.js";
class OrderTypesController {
  async createOrderType(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const orderType = await OrderTypeModel.create({
        name,
      });
      return res.status(201).json(orderType);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllOrderTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const orderTypes = await OrderTypeModel.findAll();
      return res.status(200).json(orderTypes);
    } catch (e: any) {
      next(e);
    }
  }
  async getOrderTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const orderType = await OrderTypeModel.findOne({ where: { id: id } });
      return res.status(200).json(orderType);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteOrderType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await OrderTypeModel.destroy({ where: { id: id } });
      return res.status(200).json(`OrderType id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const orderTypeController = new OrderTypesController();
