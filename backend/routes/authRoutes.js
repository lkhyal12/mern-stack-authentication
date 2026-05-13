import express from "express";
import { signUpController } from "../controllers/authControllers.js";
import { limiter } from "../middleware/limitter.js";
const authRouter = express.Router();

authRouter.post("/signup", limiter, signUpController);
export default authRouter;
