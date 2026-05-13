import express from "express";
import {
  forgotPasswordController,
  loginController,
  resetPasswordController,
  signUpController,
} from "../controllers/authControllers.js";
import { limiter } from "../middleware/limitter.js";
const authRouter = express.Router();

authRouter.post("/signup", limiter, signUpController);
authRouter.post("/login", limiter, loginController);
authRouter.post("/verify-email", limiter, verifyEmailController);
authRouter.post("/forgot-password", limiter, forgotPasswordController);
authRouter.post("/reset-password/:code", limiter, resetPasswordController);
export default authRouter;
