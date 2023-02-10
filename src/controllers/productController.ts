import { NextFunction, Request, Response } from "express";
import ApiError from "../exceptions/ApiError.js";
import { validationResult } from "express-validator";
import { ProductModel } from "../models/models.js";
import * as path from "path";
import { v4 } from "uuid";
import { UploadedFile } from "express-fileupload";
import { __dirname } from "../consts/dirname.js";
import { PLUG_IMG } from "../consts/defaultImage.js";
import fs from "fs";

class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        typeId,
        name,
        desc,
        price,
        isAvailable,
        isDiscount,
        discountedPrice,
      } = req.body;
      const img = req.files?.img as UploadedFile;
      let imgPathname;
      if (img) {
        imgPathname = v4() + ".jpg";
        img.mv(
          path.resolve(__dirname, "..", "static", "products", imgPathname)
        );
      } else {
        imgPathname = PLUG_IMG;
      }

      const product = await ProductModel.create({
        typeId,
        name,
        desc,
        img: imgPathname,
        price,
        isAvailable,
        isDiscount,
        discountedPrice,
      });
      return res.status(201).json(product);
    } catch (e: any) {
      console.log(e.message);
      next(e);
    }
  }
  async getAllProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductModel.findAll();
      return res.status(200).json(products);
    } catch (e: any) {
      next(e);
    }
  }
  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const product = await ProductModel.findOne({ where: { id: id } });
      return res.status(200).json(product);
    } catch (e: any) {
      next(e);
    }
  }
  async putProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const {
        typeId,
        name,
        desc,
        price,
        isAvailable,
        isDiscount,
        discountedPrice,
      } = req.body;
      const img = req.files?.img as UploadedFile;
      const productBeforeUpd = await ProductModel.findOne({
        where: { id: id },
      });
      let imgPathname;
      if (img) {
        imgPathname = v4() + ".jpg";
        if (productBeforeUpd?.img != PLUG_IMG) {
          fs.unlink(
            path.resolve(
              __dirname,
              "..",
              "static",
              "products",
              productBeforeUpd?.img!
            ),
            (err) => {
              if (err) next(ApiError.BadRequest(err.message, []));
              console.log(`products/${productBeforeUpd?.img}.png was deleted`);
            }
          );
        }
        img.mv(
          path.resolve(__dirname, "..", "static", "products", imgPathname)
        );
      } else {
        imgPathname = productBeforeUpd?.img;
      }
      const updatedProduct = ProductModel.update(
        {
          typeId,
          name,
          desc,
          price,
          img: imgPathname,
          isAvailable,
          isDiscount,
          discountedPrice,
        },
        { where: { id: id } }
      );
      return res.status(200).json(`Product id: ${id} was updated`);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const productBeforeDst = await ProductModel.findOne({
        where: { id: id },
      });
      if (productBeforeDst?.img != PLUG_IMG) {
        fs.unlink(
          path.resolve(
            __dirname,
            "..",
            "static",
            "products",
            productBeforeDst?.img!
          ),
          (err) => {
            if (err) next(ApiError.BadRequest(err.message, []));
            console.log(`products/${productBeforeDst?.img}.png was deleted`);
          }
        );
      }
      await ProductModel.destroy({ where: { id: id } });
      return res.status(200).json(`Product id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const productController = new ProductController();
