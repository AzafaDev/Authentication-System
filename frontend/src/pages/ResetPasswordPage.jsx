import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../stores/useAuthStore";
import Input from "../components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";

const ResetPasswordPage = () => {
  const { error, message, isLoading, resetPassword } = useAuthStore();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords are not matching");
        return;
      }
      await resetPassword(token, password);
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        overflow-hidden
        max-w-md w-full
        bg-gray-800 bg-opacity-50
        rounded-2xl
        shadow-xl
        backdrop-filter backdrop-blur-xl
      "
    >
      <div
        className="
          p-8
        "
      >
        <h2
          className="
            mb-6
            text-3xl font-bold text-center text-transparent
            bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text
          "
        >
          Reset Password
        </h2>
        {error && (
          <p
            className="
            mb-4
            text-red-500 text-sm
          "
          >
            {error}
          </p>
        )}
        {message && (
          <p
            className="
            mb-4
            text-green-500 text-sm
          "
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <Input
            icon={Lock}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Input
            icon={Lock}
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <PasswordStrengthMeter password={password} />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="
              w-full
              py-3 px-4 mt-6
              text-white font-bold
              bg-linear-to-r from-green-500 to-emerald-600
              rounded-lg
              shadow-lg
              hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200
            "
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
