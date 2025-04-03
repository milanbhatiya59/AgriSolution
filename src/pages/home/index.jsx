import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import FarmCard from "./components/FarmCard";
import { getUserFarmsApi } from "../../api/getUserFarmsApi";
import { translateText } from "../../utils/translate";
import { useLanguage } from "../../context/LanguageContext";

const HomePage = () => {
  const { user } = useUser();
  const { language } = useLanguage();
  const [userData, setUserData] = useState(null);
  const [farmsData, setFarmsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [translatedText, setTranslatedText] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await getUserFarmsApi(user.id);
        setUserData(response.user);
        const translatedFarms = await Promise.all(
          response.farms.map(async (farm) => ({
            ...farm,
            currentCrop: await translateText(
              farm.currentCrop || "Not Set",
              language
            ),
          }))
        );
        setFarmsData(translatedFarms);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load user data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, language]);

  useEffect(() => {
    const translateContent = async () => {
      const translations = {
        profile: await translateText("Profile", language),
        createFarm: await translateText("+ Create New Farm", language),
        userInfo: await translateText("User Information", language),
        email: await translateText("Email", language),
        farms: await translateText("Your Farms", language),
        loading: await translateText("Loading...", language),
        noData: await translateText("No data available.", language),
        noFarms: await translateText(
          "No farms found. Create a new one!",
          language
        ),
      };
      setTranslatedText(translations);
    };

    translateContent();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="text-lg font-semibold">
            👤 {user?.firstName} {user?.lastName} - {translatedText.profile}
          </div>
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {translatedText.createFarm}
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          {loading ? (
            <div>{translatedText.loading}</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : userData ? (
            <div>
              <h2 className="text-xl font-bold mb-4">
                {translatedText.userInfo}
              </h2>
              <p>
                <strong>{translatedText.email}:</strong> {userData.email}
              </p>
            </div>
          ) : (
            <div>{translatedText.noData}</div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">{translatedText.farms}</h2>
          {loading ? (
            <div>{translatedText.loading}</div>
          ) : farmsData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {farmsData.map((farm) => (
                <FarmCard key={farm._id} farm={farm} />
              ))}
            </div>
          ) : (
            <div>{translatedText.noFarms}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
