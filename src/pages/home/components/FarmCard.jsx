import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { translateText } from "../../../utils/translate";
import { useLanguage } from "../../../context/LanguageContext";

const FarmCard = ({ farm }) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [translatedData, setTranslatedData] = useState({});

  useEffect(() => {
    const translateFarmDetails = async () => {
      const translations = {
        farmID: await translateText("Farm ID", language),
        location: await translateText("Location", language),
        size: await translateText("Size", language),
        currentCrop: await translateText("Current Crop", language),
        soilSample: await translateText("Soil Sample No", language),
        hectares: await translateText("hectares", language),
      };
      setTranslatedData(translations);
    };

    translateFarmDetails();
  }, [language]);

  const handleCardClick = () => {
    navigate(`/farm/${farm._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        🌾 {translatedData.farmID}: {farm._id}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>📍 {translatedData.location}:</strong>{" "}
        {farm.soilSampleDetails.geoPositionLatitude},{" "}
        {farm.soilSampleDetails.geoPositionLongitude}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>📏 {translatedData.size}:</strong>{" "}
        {farm.soilSampleDetails.farmSizeInHector} {translatedData.hectares}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>🌱 {translatedData.currentCrop}:</strong>{" "}
        {farm.currentCrop || "Not Set"}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>🧪 {translatedData.soilSample}:</strong>{" "}
        {farm.soilSampleDetails.soilSampleNumber || "N/A"}
      </div>
    </div>
  );
};

export default FarmCard;
