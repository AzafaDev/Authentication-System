import { motion } from "framer-motion";

const LoadingSpinner = () => {
  return (
    <div
      className="
        flex overflow-hidden
        min-h-screen
        bg-g from-gray-900 via-green-900 to-emerald-900
        radient-to-br items-center justify-center relative
      "
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="
          w-16 h-16
          border-4 border-t-4 border-t-green-500 border-green-200 rounded-full
        "
      />
    </div>
  );
};

export default LoadingSpinner;
