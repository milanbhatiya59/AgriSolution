import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import Navbar from "./components/Navbar";
import CreatePage from "./pages/create/index";
import HomePage from "./pages/home/index";
import FarmPage from "./pages/farm/index";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import LoginWarning from "./pages/LoginWarning";
import Chatbot from "./components/ChatBot/index";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for authentication check
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust time as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-300 dark:bg-gray-700 min-h-screen transition-colors duration-300">
      <Router>
        <Navbar />
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedOut>
                    <LoginWarning />
                  </SignedOut>
                  <SignedIn>
                    <HomePage />
                  </SignedIn>
                </>
              }
            />

            <Route
              path="/farm/:id"
              element={
                <PrivateRoute>
                  <FarmPage />
                </PrivateRoute>
              }
            />

            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <CreatePage />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
        <Chatbot />
      </Router>
    </div>
  );
}

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Spinner with better contrast & visibility */}
      <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 border-t-transparent dark:border-t-white rounded-full animate-spin mb-4"></div>

      {/* Loading Text with Animated Dots */}
      <p className="text-gray-700 dark:text-white font-semibold text-lg flex space-x-1">
        <span>Loading</span>
        <span className="animate-bounce">.</span>
        <span className="animate-bounce delay-150">.</span>
        <span className="animate-bounce delay-300">.</span>
      </p>
    </div>
  );
};


export default App;
