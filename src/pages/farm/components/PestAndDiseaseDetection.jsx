import { useState } from "react";
import { getPestAndDiseaseData } from "../../../api/getPestAndDiseaseData";

const PestAndDiseaseDetection = ({ farmData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [pestAndDiseaseData, setPestAndDiseaseData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Allowed file types
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/bmp",
    "image/webp",
  ];

  // Handle Image Selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!allowedFileTypes.includes(file.type)) {
      setError("Invalid file type! Please upload a valid image.");
      return;
    }

    setError(null);
    setSelectedImage(file);
    setPreviewImage(URL.createObjectURL(file));
    setPestAndDiseaseData(null);
  };

  // Handle Image Upload and Fetch Analysis
  const handleUpload = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setPestAndDiseaseData(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage); // ✅ Ensure 'image' key matches backend expectation

      // Call the backend API
      const response = await getPestAndDiseaseData(formData, farmData);

      setPestAndDiseaseData(response);
    } catch (error) {
      setError("Failed to fetch data. Please try again.");
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
        Pest & Disease Detection
      </h2>

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4"
      />

      {/* Image Preview */}
      {previewImage && (
        <div className="mb-4">
          <img
            src={previewImage}
            alt="Selected"
            className="w-48 h-48 object-cover rounded-md"
          />
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Loading Indicator */}
      {loading && (
        <p className="text-gray-700 dark:text-gray-300 mt-2">Processing...</p>
      )}

      {/* Display Analysis Data */}
      {pestAndDiseaseData && (
        <div className="mt-6">
          {pestAndDiseaseData.analysis.type === "healthy" ? (
            <p className="text-green-600 font-medium">
              ✅ No pests or diseases detected. The crop appears healthy.
            </p>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-red-500">
                {pestAndDiseaseData.analysis.name}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mt-2">
                {pestAndDiseaseData.analysis.description}
              </p>

              {/* Affected Crops */}
              {pestAndDiseaseData.analysis.affected_crops?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Affected Crops:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {pestAndDiseaseData.analysis.affected_crops.map(
                      (crop, index) => (
                        <li key={index}>{crop}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Symptoms */}
              {pestAndDiseaseData.analysis.symptoms?.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Symptoms:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                    {pestAndDiseaseData.analysis.symptoms.map(
                      (symptom, index) => (
                        <li key={index}>{symptom}</li>
                      )
                    )}
                  </ul>
                </div>
              )}

              {/* Control Measures */}
              <div className="mt-4">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Control Measures:
                </h4>
                <p className="font-medium text-blue-500 mt-2">
                  🌱 Organic Methods:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {pestAndDiseaseData.analysis.control_measures?.organic.map(
                    (method, index) => (
                      <li key={index}>{method}</li>
                    )
                  )}
                </ul>
                <p className="font-medium text-red-500 mt-2">
                  💊 Chemical Methods:
                </p>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {pestAndDiseaseData.analysis.control_measures?.chemical.map(
                    (method, index) => (
                      <li key={index}>{method}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PestAndDiseaseDetection;
