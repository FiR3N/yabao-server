import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { TypeAdditionModel } from "../models/models.js";
class TypeAdditionController {
  async createTypeAddition(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, price, typeId, addition_lvl } = req.body;
      const typeAddition = await TypeAdditionModel.create({
        name,
        price,
        typeId,
        addition_lvl,
      });
      return res.status(201).json(typeAddition);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllTypeAdditions(req: Request, res: Response, next: NextFunction) {
    try {
      const typeAdditions = await TypeAdditionModel.findAll();
      return res.status(200).json(typeAdditions);
    } catch (e: any) {
      next(e);
    }
  }
  async getTypeAdditionByTypeId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { typeId } = req.params;
      const typeAddition = await TypeAdditionModel.findAll({
        where: { $typeId$: typeId },
      });
      return res.status(200).json(typeAddition);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteTypeAddition(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await TypeAdditionModel.destroy({ where: { id: id } });
      return res.status(200).json(`Type Addition id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const typeAdditionController = new TypeAdditionController();
