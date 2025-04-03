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
        className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        {translatedText}
      </button>
    </div>
  );
};

export default FormActions;
