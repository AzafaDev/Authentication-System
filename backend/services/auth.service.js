import bcrypt from "bcrypt";
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { sendingEmail } from "../utils/emails.js";

export const authServices = {
  signup: async (name, email, password) => {
    try {
      if (!name.trim() || !email.trim() || !password.trim())
        throw new Error("Bad request");
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("Email has been registered");
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = Math.floor(
        100000 + Math.random() * 900000,
      ).toString();
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });
      await user.save();
      await sendingEmail.verification(user.email, verificationToken);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  verify: async (code) => {
    try {
      const user = await User.findOne({
        verificationToken: code,
        verificationExpiresAt: { $gt: Date.now() },
      });
      if (!user) throw new Error("Invalid or expired token");
      user.verificationExpiresAt = undefined;
      user.verificationToken = undefined;
      user.isVerified = true;
      await user.save();
      await sendingEmail.welcome(user.name, user.email);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  login: async (email, password) => {
    try {
      const existingUser = await User.findOne({ email });
      if (!existingUser) throw new Error("User not found");
      const isValidPassword = await bcrypt.compare(
        password,
        existingUser.password,
      );
      if (!isValidPassword) throw new Error("Invalid password");
      existingUser.lastLogin = Date.now();
      await existingUser.save();
      return existingUser;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  forgotPassword: async (email) => {
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Bad request");
      const resetPasswordToken = crypto.randomBytes(20).toString("HEX");
      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
      await user.save();
      await sendingEmail.forgotPassword(user.email, resetPasswordToken);
    } catch (error) {
      throw new Error(error.message);
    }
  },
  resetPassword: async (token, password) => {
    try {
      const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: { $gt: Date.now() },
      });
      if (!user) throw new Error("Invalid or expired token");
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpiresAt = undefined;
      await user.save();
      await sendingEmail.successfulResetPassword(user.email);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
