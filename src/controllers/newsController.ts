import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { v4 } from "uuid";
import { PLUG_NEWS_IMG } from "../consts/defaultImage.js";
import { __dirname } from "../consts/dirname.js";
import ApiError from "../exceptions/ApiError.js";
import { NewsModal } from "../models/models.js";
import fs from "fs";

class NewsController {
  async createNews(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(__dirname);
      const { name, desc, userId } = req.body;
      const img = req.files?.img as UploadedFile;
      let imgPathname;
      if (img) {
        imgPathname = v4() + ".jpg";
        img.mv(path.resolve(__dirname, "static", "news", imgPathname));
      } else {
        imgPathname = PLUG_NEWS_IMG;
      }
      const news = await NewsModal.create({
        name,
        desc,
        img: imgPathname,
        userId: userId,
      });
      return res.status(201).json(news);
    } catch (e: any) {
      next(e);
    }
  }
  async getAllNews(req: Request, res: Response, next: NextFunction) {
    try {
      let { limit }: any = req.query;
      limit = limit || null;
      const news = await NewsModal.findAll({ limit });
      return res.status(200).json(news);
    } catch (e: any) {
      next(e);
    }
  }
  async getNewsById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const news = await NewsModal.findOne({ where: { id: id } });
      return res.status(200).json(news);
    } catch (e: any) {
      next(e);
    }
  }
  async deleteNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const newsBeforeDst = await NewsModal.findOne({ where: { id: id } });
      if (newsBeforeDst?.img != PLUG_NEWS_IMG) {
        fs.unlink(
          path.resolve(__dirname, "static", "news", newsBeforeDst?.img!),
          (err) => {
            if (err) next(ApiError.BadRequest(err.message, []));
            console.log(`news/${newsBeforeDst?.img}.png was deleted`);
          }
        );
      }
      await NewsModal.destroy({ where: { id: id } });
      return res.status(200).json(`News id: ${id} was deleted`);
    } catch (e: any) {
      next(e);
    }
  }
  async putNews(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name, desc } = req.body;
      const img = req.files?.img as UploadedFile;

      const newsBeforeUpd = await NewsModal.findOne({ where: { id: id } });

      let imgPathname;
      if (img) {
        imgPathname = v4() + ".jpg";
        if (newsBeforeUpd?.img != PLUG_NEWS_IMG) {
          fs.unlink(
            path.resolve(
              __dirname,
              "..",
              "static",
              "news",
              newsBeforeUpd?.img!
            ),
            (err) => {
              if (err) next(ApiError.BadRequest(err.message, []));
              console.log(`news/${newsBeforeUpd?.img}.png was deleted`);
            }
          );
        }
        img.mv(path.resolve(__dirname, "static", "news", imgPathname));
      } else {
        imgPathname = newsBeforeUpd?.img;
      }
      await NewsModal.update(
        { name, desc, img: imgPathname },
        { where: { id: id } }
      );
      return res.status(200).json(`News id: ${id} was updated`);
    } catch (e: any) {
      next(e);
    }
  }
}

export const newsController = new NewsController();
