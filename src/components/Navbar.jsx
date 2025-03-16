import ThemeToggleButton from "./ThemeToggleButton";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo or Brand Name */}
        <div className="text-gray-900 dark:text-white text-xl font-extrabold tracking-wide transition-colors duration-300">
          Agri Solution
        </div>

        <div className="flex items-center space-x-4">
          <ThemeToggleButton />
          <SignedOut>
            <SignInButton className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-300 shadow-md hover:bg-gray-300 dark:hover:bg-gray-700" />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
