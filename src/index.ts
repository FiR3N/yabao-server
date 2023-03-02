import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./db.js";
import * as models from "./models/models.js";
import fileUpload from "express-fileupload";
import router from "./routes/router.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import path from "path";
const __dirname = path.resolve("src");
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);
app.use(express.urlencoded());
app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.static(path.resolve(__dirname, "static", "news")));
app.use(express.static(path.resolve(__dirname, "static", "products")));
app.use(fileUpload({}));

app.use("/api", router);

app.use(errorMiddleware);
const start = () => {
  try {
    sequelize.authenticate();
    sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
  } catch (e: any) {
    console.log(e.message);
  }
};

start();
