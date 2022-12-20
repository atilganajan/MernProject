import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import commentRouter from "./routes/commentRouter.js";
import resCommentRouter from "./routes/resCommentRouter.js";

import cors from "cors";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(cookieParser());

app.use("/users", cors(), userRouter);
app.use("/products", cors(), productRouter )
app.use("/comments", cors(), commentRouter )
 app.use("/rescomments", cors(), resCommentRouter )



app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => {
      console.log("MongoDB bağlantısı gerçekleştirildi");
    })
    .catch((err) => {
      console.log(err);
    });
});
