const LoginWarning = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen transition-colors duration-300 bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-2xl shadow-lg flex flex-col items-center text-center transition-colors duration-300">
        <h1 className="text-6xl font-extrabold text-red-500 dark:text-red-400 mb-4 animate-bounce">
          ⚠️
        </h1>
        <h2 className="text-3xl font-bold mb-3">Access Denied</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          You must be logged in to access this page.
        </p>
      </div>
    </div>
  );
};

export default LoginWarning;
