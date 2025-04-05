import Warnings from "./components/Warnings";
import Notifications from "./components/Notifications";
import PestAndDiseaseDetection from "./components/PestAndDiseaseDetection";
import FarmDetails from "./components/FarmDetails";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFarmById } from "../../api/getFarmById";
import { useLanguage } from "../../context/LanguageContext";
import { translateText } from "../../utils/translate";

const FarmPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [farmData, setFarmData] = useState(null);
  const { language } = useLanguage();
  const [translatedTitle, setTranslatedTitle] = useState("Farm Details");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFarmById(id);
        setFarmData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const translateTitle = async () => {
      const translation = await translateText("Farm Details", language);
      setTranslatedTitle(translation);
    };
    translateTitle();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-8xl mx-auto px-6 py-8 space-y-6">

        {/* Header */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <button
            onClick={() => navigate("/")}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back to home
          </button>
          <h1 className="text-3xl font-bold text-center">{translatedTitle}</h1>
        </div>

        {/* Main Row */}
        <div className="flex flex-row items-start justify-center space-x-6">

          {/* FarmDetails - 2/3 */}
          <FarmDetails farmData={farmData} />

          {/* Middle Column - Pest + Warnings */}
          <div className="w-1/3 space-y-6">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <PestAndDiseaseDetection farmData={farmData} />
            </div>
            <div className="bg-yellow-100 dark:bg-gray-800 shadow-lg rounded-lg p-6">
              <Warnings farmData={farmData} />
            </div>
          </div>

          {/* Right Column - Notifications */}
          <div className="w-1/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <Notifications id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmPage;
