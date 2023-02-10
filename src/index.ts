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
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log(models);
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
app.use(fileUpload({}));
app.use(express.static("static"));
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
