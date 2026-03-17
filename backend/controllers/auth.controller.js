import { User } from "../models/user.model.js";
import { authServices } from "../services/auth.service.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const authControllers = {
  signup: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await authServices.signup(name, email, password);
      generateTokenAndSetCookie(res, user._id);
      res.status(201).json({
        success: true,
        message: "Sign up successfully",
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  verify: async (req, res) => {
    try {
      const { code } = req.body;
      const user = await authServices.verify(code);
      res.status(200).json({
        success: true,
        message: "Welcome to our authentication system",
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authServices.login(email, password);
      generateTokenAndSetCookie(res, user._id);
      res.status(200).json({
        success: true,
        message: "Login successfully",
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("token");
      res.status(200).json({ success: true, message: "Logout successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      await authServices.forgotPassword(email);
      res.status(200).json({
        success: true,
        message: `Reset password email has been sent successfully to ${email}`,
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { token } = req.params;
      const { password } = req.body;
      const user = await authServices.resetPassword(token, password);
      res.status(200).json({
        success: true,
        message: "Reset password successfully",
        user: { ...user._doc, password: undefined },
      });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  },
  checkAuth: async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user)
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      res
        .status(200)
        .json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {}
  },
};
