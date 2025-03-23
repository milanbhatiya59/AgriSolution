import { data, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getSoilCardApiData } from "../../api/getSoilCardApiData";
import { createFarmApi } from "../../api/createFarmApi";
import { useUser } from "@clerk/clerk-react";

const CreatePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const clerkUserId = user?.id || "";

  const [image, setImage] = useState(null);
  const [cropRecommendations, setCropRecommendations] = useState([]);
  const [fertilizerNeeded, setFertilizerNeeded] = useState([]);

  const [formData, setFormData] = useState({
    soilHealthCard: {
      soilHealthCardNo: "",
      validityFrom: "",
      validityTo: "",
    },
    farmersDetails: {
      name: "",
      address: "",
      village: "",
      subDistrict: "",
      district: "",
      PIN: "",
    },
    soilSampleDetails: {
      soilSampleNumber: "",
      surveyNo: "",
      farmSizeInHector: "",
      geoPositionLatitude: "",
      geoPositionLongitude: "",
    },
    soilTestResults: {
      pH: "",
      EC: "",
      organicCarbon_OC: "",
      availableNitrogen_N: "",
      availablePhosphorus_P: "",
      availablePotassium_K: "",
      availableSulphur_S: "",
      availableZinc_Zn: "",
      availableBoron_B: "",
      availableIron_Fe: "",
      availableManganese_Mn: "",
      availableCopper_Cu: "",
    },
    currentCrop: "",
    fertilizerNeeded: [],
  });

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
      await createFarmApi(clerkUserId, finalData);
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="text-lg font-semibold">Create Farm</div>

          {/* Buttons Container */}
          <div className="flex space-x-4">
            {/* Back Button */}
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg shadow-md hover:bg-gray-400 dark:hover:bg-gray-600 transition"
            >
              Back to Home
            </button>

            {/* Upload Button */}
            <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
              Upload SoilCard Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </label>
          </div>
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
          {/* General Farm Information */}
          <div>
            {["soilHealthCard", "farmersDetails", "soilSampleDetails"].map(
              (section) => (
                <div key={section}>
                  <h2 className="text-lg font-semibold mb-4">
                    {section.replace(/([A-Z])/g, " $1")}
                  </h2>
                  {Object.keys(formData[section]).map((field) => (
                    <div key={field} className="mb-2">
                      <label className="block text-sm font-medium mb-1">
                        {field.replace(/([A-Z])/g, " $1")}
                      </label>
                      <input
                        type="text"
                        name={`${section}.${field}`}
                        value={formData[section][field] || ""}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  ))}
                </div>
              )
            )}
          </div>

          {/* Soil Test Results */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Soil Test Results</h2>
            {Object.keys(formData.soilTestResults).map((field) => (
              <div key={field} className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  name={`soilTestResults.${field}`}
                  value={formData.soilTestResults[field] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
          </div>

          {/* Crop Recommendations & Fertilizer Suggestions */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Crop Recommendations</h2>
            <label className="block text-sm font-medium mb-1">
              Select a Crop
            </label>
            <select
              name="currentCrop"
              value={formData.currentCrop}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select a Crop</option>
              {cropRecommendations.map((crop, index) => (
                <option key={index} value={crop.cropName}>
                  {crop.cropName}
                </option>
              ))}
            </select>

            {fertilizerNeeded.length > 0 && (
              <div className="mt-4">
                <h3 className="text-md font-semibold mb-2">
                  Fertilizer Recommendations
                </h3>
                <ul className="list-disc pl-5">
                  {fertilizerNeeded.map((fertilizer, index) => (
                    <li key={index}>
                      {fertilizer.name}: {fertilizer.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            type="submit"
            className="col-span-full px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
