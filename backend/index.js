import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRoutes.js";
import mongoose from "mongoose";
const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRouter);
const PORT = process.env.PORT || 3000;
const code = Math.floor(Math.random() * 900000 + 100000);
console.log({ code });
console.log(process.env.EMAIL_PASS);
app.listen(PORT, () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("connected to mongodb");
      console.log("server is running");
    })
    .catch(() => process.exit(1));
});
