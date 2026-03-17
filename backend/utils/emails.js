import { resend, sender } from "../configs/resend.js";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "../templates/emailTemplates.js";

export const sendingEmail = {
  verification: async (email, token) => {
    try {
      const response = await resend.emails.send({
        from: sender,
        to: email,
        subject: "Verify your email",
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", token),
      });
      console.log(`Verification email sent successfully: ${response}`);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  welcome: async (name, email) => {
    try {
      const response = await resend.emails.send({
        from: sender,
        to: email,
        subject: "Welcome to our authentication system",
        html: WELCOME_EMAIL_TEMPLATE.replace("{userName}", name).replace(
          "{dashboardURL}",
          `${process.env.CLIENT_URL}/dashboard`,
        ),
      });
      console.log(`Welcome email sent successfully: ${response}`);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  forgotPassword: async (email, token) => {
    try {
      const response = await resend.emails.send({
        from: sender,
        to: email,
        subject: "Reset password link",
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
          "{resetURL}",
          `${process.env.CLIENT_URL}/reset-password/${token}`,
        ),
      });
      console.log(`Forgot password email sent successfully: ${response}`);
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
  successfulResetPassword: async (email) => {
    try {
      const response = await resend.emails.send({
        from: sender,
        to: email,
        subject: "Reset password successfully",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      });
      console.log(
        `Successful reset password email sent successfully: ${response}`,
      );
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  },
};
