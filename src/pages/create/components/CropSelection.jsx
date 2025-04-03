import { useLanguage } from "../../../context/LanguageContext";
import { translateText } from "../../../utils/translate";
import { useEffect, useState } from "react";

const CropSelection = ({ formData, handleChange, cropRecommendations }) => {
  const { language } = useLanguage();
  const [translatedTexts, setTranslatedTexts] = useState({});

  useEffect(() => {
    const fetchTranslations = async () => {
      setTranslatedTexts({
        title: await translateText("Crop Recommendations", language),
        selectCrop: await translateText("Select a Crop", language),
      });
    };

    fetchTranslations();
  }, [language]);

  return (
    <div className="md:col-span-1">
      <h2 className="text-lg font-semibold mb-4">
        {translatedTexts.title || "Crop Recommendations"}
      </h2>
      <label className="block text-sm font-medium mb-1">
        {translatedTexts.selectCrop || "Select a Crop"}
      </label>
      <select
        name="currentCrop"
        value={formData.currentCrop}
        onChange={handleChange}
        className="w-full p-2 border rounded bg-green-200 dark:bg-green-700 focus:border-green-400 focus:ring-1 focus:ring-green-400 text-black"
      >
        <option value="">
          {translatedTexts.selectCrop || "Select a Crop"}
        </option>
        {cropRecommendations.map((crop, index) => (
          <option key={index} value={crop.cropName}>
            {crop.cropName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CropSelection;
