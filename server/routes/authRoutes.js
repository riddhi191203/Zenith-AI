import express from "express";
import {
  forgotPassword,
  login,
  me,
  register,
  resetPassword,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/me", auth, me);

export default authRouter;
