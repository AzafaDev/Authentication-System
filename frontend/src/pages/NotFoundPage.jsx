import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl p-8 text-center"
    >
      <h2 className="text-3xl font-bold mb-4 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
        404 - Page Not Found
      </h2>
      <p className="text-gray-300 mb-6">
        Halaman yang kamu cari tidak ada, nih.
      </p>
      <Link
        to="/"
        className="py-3 px-4 bg-linear-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition duration-200"
      >
        Balik ke Home
      </Link>
    </motion.div>
  );
};
export default NotFoundPage;
