import { useLanguage } from "../../../context/LanguageContext";
import { translateText } from "../../../utils/translate";
import { useEffect, useState } from "react";

const FormActions = () => {
  const { language } = useLanguage();
  const [translatedText, setTranslatedText] = useState("Submit");

  useEffect(() => {
    const fetchTranslation = async () => {
      setTranslatedText(await translateText("Submit", language));
    };

    fetchTranslation();
  }, [language]);

  return (
    <div className="col-span-full flex justify-center">
      <button
        type="submit"
        className="px-6 py-3 bg-[#65A30D] text-white font-semibold rounded-lg shadow-md hover:bg-[#55890B] hover:scale-105 transition-all"
      >
        {translatedText}
      </button>
    </div>
  );
};

export default FormActions;
