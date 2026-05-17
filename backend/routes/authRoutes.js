import express from "express";
import {
  forgotPasswordController,
  getProfileController,
  loginController,
  logoutController,
  refreshController,
  resetPasswordController,
  signUpController,
  verifyEmailController,
} from "../controllers/authControllers.js";
import { limiter } from "../middleware/limitter.js";
import { checkAuth } from "../middleware/checkAuth.js";
const authRouter = express.Router();

authRouter.post("/signup", limiter, signUpController);
authRouter.post("/login", limiter, loginController);
authRouter.post("/logout", logoutController);
authRouter.post("/verify-email", limiter, verifyEmailController);
authRouter.post("/forgot-password", limiter, forgotPasswordController);
authRouter.post("/reset-password/:code", limiter, resetPasswordController);
authRouter.get("/profile", checkAuth, getProfileController);
authRouter.get("/refresh", refreshController);
export default authRouter;
