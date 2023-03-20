import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { PromocodesModel } from "../models/models.js";
class PromocodesController {
  async createPromo(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, rebate } = req.body;
      const promo = await PromocodesModel.create({
        name,
        rebate,
      });
      return res.status(201).json(promo);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllPromos(req: Request, res: Response, next: NextFunction) {
    try {
      const promos = await PromocodesModel.findAll();
      return res.status(200).json(promos);
    } catch (e: any) {
      next(e);
    }
  }
  async getPromoById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const promo = await PromocodesModel.findOne({ where: { id: id } });
      return res.status(200).json(promo);
    } catch (e: any) {
      next(e);
    }
  }
  async deletePromo(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await PromocodesModel.destroy({ where: { id: id } });
      return res.status(200).json(`Promo id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const promocodesController = new PromocodesController();
