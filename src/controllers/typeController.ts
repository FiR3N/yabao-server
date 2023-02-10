import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { TypeModel } from "../models/models.js";
class TypeController {
  async createType(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body;
      const type = await TypeModel.create({
        name,
      });
      return res.status(201).json(type);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllTypes(req: Request, res: Response, next: NextFunction) {
    try {
      const types = await TypeModel.findAll();
      return res.status(200).json(types);
    } catch (e: any) {
      next(e);
    }
  }
  async getTypeById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const type = await TypeModel.findOne({ where: { id: id } });
      return res.status(200).json(type);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteType(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await TypeModel.destroy({ where: { id: id } });
      return res.status(200).json(`Type id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const typeController = new TypeController();
