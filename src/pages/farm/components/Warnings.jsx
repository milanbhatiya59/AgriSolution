import { useState, useEffect } from "react";
import { getWarning } from "../../../api/getWarning";
import { AlertTriangle } from "lucide-react";
import { useLanguage } from "../../../context/LanguageContext";
import { translateText } from "../../../utils/translate";

const Warning = ({ farmData }) => {
  const [warning, setWarning] = useState(null);
  const { language } = useLanguage();
  const [translatedTitle, setTranslatedTitle] = useState("Warnings");
  const [translatedWarning, setTranslatedWarning] = useState(null);

  useEffect(() => {
    if (!farmData) return;

    const fetchWarning = async () => {
      try {
        const response = await getWarning(farmData);
        setWarning(response);
      } catch (err) {
        console.error("Error fetching warning:", err);
      }
    };

    fetchWarning();
  }, [farmData]);

  useEffect(() => {
    const translateContent = async () => {
      const titleTranslation = await translateText("Warnings", language);
      setTranslatedTitle(titleTranslation);

      if (warning) {
        const translatedData = {
          weather: warning.weather
            ? await translateText(warning.weather, language)
            : null,
          soilHealth: warning.soilHealth
            ? await translateText(warning.soilHealth, language)
            : null,
          cropHealth: warning.cropHealth
            ? await translateText(warning.cropHealth, language)
            : null,
        };

        setTranslatedWarning(translatedData);
      }
    };

    translateContent();
  }, [language, warning]);

  return (
    <div className="bg-red-100 dark:bg-red-900 shadow-lg rounded-lg p-6 border-l-8 border-red-700">
      <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2" /> {translatedTitle}
      </h2>

      {translatedWarning ? (
        <div className="space-y-4 mt-4">
          {translatedWarning.weather && <p>⚠️ {translatedWarning.weather}</p>}
          {translatedWarning.soilHealth && (
            <p>⚠️ {translatedWarning.soilHealth}</p>
          )}
          {translatedWarning.cropHealth && (
            <p>⚠️ {translatedWarning.cropHealth}</p>
          )}
        </div>
      ) : (
        <p className="text-red-700 dark:text-red-400">No warnings available.</p>
      )}
    </div>
  );
};

export default Warning;
