// index.js
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { translateText } from "../../utils/translate";
import CommunityChat from "./components/CommunityChat";
import CommunityList from "./components/CommunityList";
import CreateCommunity from "./components/CreateCommunity";

const CommunityPage = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [translatedText, setTranslatedText] = useState({
    community: "Community",
    createCommunity: "+ Create New Community",
  });

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);

  useEffect(() => {
    const translateContent = async () => {
      const community = await translateText("Community", language);
      const createCommunity = await translateText(
        "+ Create New Community",
        language
      );
      setTranslatedText({ community, createCommunity });
    };
    translateContent();
  }, [language]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back
          </button>
          <h1 className="text-3xl font-bold">{translatedText.community}</h1>
          <button
            onClick={() => setShowDialog(true)}
            className="px-4 py-2 bg-green-600 text-white font-bold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {translatedText.createCommunity}
          </button>
        </div>

        <div className="flex flex-row items-start justify-center space-x-6 h-[calc(100vh-200px)]">
          <div className="w-1/3 h-full">
            <CommunityList
              onSelectCommunity={setSelectedCommunity}
              selectedCommunityId={selectedCommunity?._id}
            />
          </div>
          <div className="w-2/3 h-full">
            <CommunityChat selectedCommunity={selectedCommunity} />
          </div>
        </div>
      </div>

      {showDialog && <CreateCommunity onClose={() => setShowDialog(false)} />}
    </div>
  );
};

export default CommunityPage;
