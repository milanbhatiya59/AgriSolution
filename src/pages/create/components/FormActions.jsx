import { useLanguage } from "../../../context/LanguageContext";
import { translateText } from "../../../utils/translate";
import { useEffect, useState } from "react";

const FormActions = ({ loading }) => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState("Submit");

  useEffect(() => {
    const fetchTranslation = async () => {
      const text = await translateText("Submit", language);
      setTranslatedText(text);
    };

    fetchTranslation();
  }, [language]);

  return (
    <div className="col-span-full flex justify-center">
      <button
        type="submit"
        disabled={loading}
        className={`px-4 py-2 rounded-lg shadow-md transition text-white 
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }
        `}
      >
        {loading ? "Submitting..." : translatedText}
      </button>
    </div>
  );
};

export default FormActions;
