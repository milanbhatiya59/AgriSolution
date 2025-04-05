import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getSoilCardApiData } from "../../api/getSoilCardApiData";
import { createFarm } from "../../api/createFarmApi";
import { useUser } from "@clerk/clerk-react";
import { useLanguage } from "../../context/LanguageContext";
import { translateText } from "../../utils/translate";
import SoilHealthCardForm from "./components/SoilHealthCardForm";
import FarmersDetailsForm from "./components/FarmersDetailsForm";
import SoilSampleDetailsForm from "./components/SoilSampleDetailsForm";
import SoilTestResultsForm from "./components/SoilTestResultsForm";
import CropSelection from "./components/CropSelection";
import FormActions from "./components/FormActions";

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { language } = useLanguage();
  const clerkUserId = user?.id || "";

  const [image, setImage] = useState(null);
  const [cropRecommendations, setCropRecommendations] = useState([]);
  const [fertilizerNeeded, setFertilizerNeeded] = useState([]);
  const [translatedTexts, setTranslatedTexts] = useState({});

  const [formData, setFormData] = useState({
    soilHealthCard: {
      SoilHealthCardNo: "",
      ValidityFrom: "",
      ValidityTo: "",
    },
    farmersDetails: {
      Name: "",
      Address: "",
      Village: "",
      SubDistrict: "",
      District: "",
      PIN: "",
    },
    soilSampleDetails: {
      SoilSampleNumber: "",
      SurveyNo: "",
      FarmSizeInHector: "",
      GeoPositionLatitude: "",
      GeoPositionLongitude: "",
    },
    soilTestResults: {
      pH: "",
      EC: "",
      OrganicCarbonOC: "",
      AvailableNitrogenN: "",
      AvailablePhosphorusP: "",
      AvailablePotassiumK: "",
      AvailableSulphurS: "",
      AvailableZincZn: "",
      AvailableBoronB: "",
      AvailableIronFe: "",
      AvailableManganeseMn: "",
      AvailableCopperCu: "",
    },
    currentCrop: "",
    fertilizerNeeded: [],
  });

  useEffect(() => {
    const fetchTranslations = async () => {
      const keys = {
        backToHome: "Back to Home",
        createFarm: "Create Farm",
        deleteSoilCard: "Delete Soil Card Image",
        uploadSoilCard: "Upload Soil Card Image",
      };

      const translated = {};
      for (const key in keys) {
        translated[key] = await translateText(keys[key], language);
      }
      setTranslatedTexts(translated);
    };

    fetchTranslations();
  }, [language]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      await processImage(file);
    }
  };

  const processImage = async (file) => {
    const imageFormData = new FormData();
    imageFormData.append("soilcard", file);
    try {
      const data = await getSoilCardApiData(imageFormData);
      setFormData((prev) => ({ ...prev, ...data, currentCrop: "" }));
      setCropRecommendations(data.cropRecommendations || []);
      setFertilizerNeeded([]);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const keys = name.split(".");
    let updatedData = { ...formData };
    let obj = updatedData;
    for (let i = 0; i < keys.length - 1; i++) {
      obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = value;
    setFormData(updatedData);

    if (name === "currentCrop") {
      const currentCrop = cropRecommendations.find(
        (crop) => crop.cropName === value
      );
      setFertilizerNeeded(currentCrop ? currentCrop.fertilizerNeeded : []);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const finalData = {
      ...formData,
      fertilizerNeeded,
    };

    try {
      await createFarm(clerkUserId, finalData);
      console.log("Farm Created Successfully");
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
            {translatedTexts.backToHome}
          </button>

          <div className="flex-1 text-center text-lg font-semibold">
            {translatedTexts.createFarm}
          </div>

          {image && (
            <button
              onClick={handleDeleteImage}
              className="px-4 py-2 bg-red-600 text-white font-bold rounded-lg shadow-md hover:bg-red-700 transition mx-2"
            >
              {translatedTexts.deleteSoilCard}
            </button>
          )}

          <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 font-bold rounded-lg shadow-md hover:bg-blue-700 transition">
            {translatedTexts.uploadSoilCard}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {image && (
          <div className="flex justify-center">
            <img
              src={image}
              alt="Uploaded"
              className="max-w-xs rounded-lg shadow-lg"
            />
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <SoilHealthCardForm formData={formData} handleChange={handleChange} />
          <FarmersDetailsForm formData={formData} handleChange={handleChange} />
          <SoilSampleDetailsForm
            formData={formData}
            handleChange={handleChange}
          />
          <SoilTestResultsForm
            formData={formData}
            handleChange={handleChange}
          />
          <CropSelection
            formData={formData}
            handleChange={handleChange}
            cropRecommendations={cropRecommendations}
          />
          <FormActions handleSubmit={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
