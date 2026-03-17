import { Router } from "express";
import { authControllers } from "../controllers/auth.controller.js";
import { verifyCookie } from "../middlewares/verifyCookie.js";

const authRouter = Router();

authRouter.get("/check-auth", verifyCookie, authControllers.checkAuth);

authRouter.post("/sign-up", authControllers.signup);
authRouter.post("/verify-email", authControllers.verify);
authRouter.post("/login", authControllers.login);
authRouter.post("/logout", authControllers.logout);
authRouter.post("/forgot-password", authControllers.forgotPassword);
authRouter.post("/reset-password/:token", authControllers.resetPassword);

export default authRouter;
