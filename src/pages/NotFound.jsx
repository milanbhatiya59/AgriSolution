import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-300 bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">404</h1>
      <p className="text-lg mb-6 text-gray-600 dark:text-gray-300">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-md transition-colors duration-300 shadow-md bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-900"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
