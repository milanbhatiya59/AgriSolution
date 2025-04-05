import ThemeToggleButton from "./ThemeToggleButton";
import LanguageSelector from "./LanguageSelector";
import AuthButton from "./AuthButton";
import CommunityChatButton from "./CommunityChatButton";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-200 dark:bg-gray-800 shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-4 sm:px-6 lg:px-8">
        <div className="text-gray-900 dark:text-white text-xl font-extrabold tracking-wide transition-colors duration-300">
          Agri Solution
        </div>

        <div className="flex items-center space-x-4">
          <AuthButton />
          <ThemeToggleButton />
          <LanguageSelector />
          <CommunityChatButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
