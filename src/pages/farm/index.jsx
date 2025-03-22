import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFarmById } from "../../api/getFarmById";

const FarmPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [farmData, setFarmData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFarmById(id);
        setFarmData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold">Farm Details</h1>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Back
          </button>
        </div>

        <div className="flex flex-row items-start justify-center space-x-6">
          {/* Farm Details Section */}
          <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <p className="text-lg mb-6">
              Viewing details for Farm ID: <strong>{id}</strong>
            </p>
            {farmData ? (
              <div>
                <h2 className="text-2xl font-semibold mb-4">Farmer Details</h2>
                <p>
                  <strong>Name:</strong>{" "}
                  {farmData.farmersDetails?.name || "N/A"}
                </p>
                <p>
                  <strong>Address:</strong>{" "}
                  {farmData.farmersDetails?.address || "N/A"}
                </p>
                <p>
                  <strong>Village:</strong>{" "}
                  {farmData.farmersDetails?.village || "N/A"}
                </p>
                <p>
                  <strong>Sub-District:</strong>{" "}
                  {farmData.farmersDetails?.subDistrict || "N/A"}
                </p>
                <p>
                  <strong>District:</strong>{" "}
                  {farmData.farmersDetails?.district || "N/A"}
                </p>
                <p>
                  <strong>PIN:</strong> {farmData.farmersDetails?.PIN || "N/A"}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">
                  Soil Health Card
                </h2>
                <p>
                  <strong>Card Number:</strong>{" "}
                  {farmData.soilHealthCard?.soilHealthCardNo || "N/A"}
                </p>
                <p>
                  <strong>Validity:</strong>{" "}
                  {farmData.soilHealthCard?.validityFrom || "N/A"} -{" "}
                  {farmData.soilHealthCard?.validityTo || "N/A"}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">
                  Soil Sample Details
                </h2>
                <p>
                  <strong>Sample Number:</strong>{" "}
                  {farmData.soilSampleDetails?.soilSampleNumber || "N/A"}
                </p>
                <p>
                  <strong>Survey Number:</strong>{" "}
                  {farmData.soilSampleDetails?.surveyNo || "N/A"}
                </p>
                <p>
                  <strong>Farm Size (Hectares):</strong>{" "}
                  {farmData.soilSampleDetails?.farmSizeInHector || "N/A"}
                </p>
                <p>
                  <strong>Latitude:</strong>{" "}
                  {farmData.soilSampleDetails?.geoPositionLatitude || "N/A"}
                </p>
                <p>
                  <strong>Longitude:</strong>{" "}
                  {farmData.soilSampleDetails?.geoPositionLongitude || "N/A"}
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">
                  Soil Test Results
                </h2>
                {Object.entries(farmData.soilTestResults || {}).map(
                  ([key, value]) => (
                    <p key={key}>
                      <strong>{key.replace(/_/g, " ")}:</strong>{" "}
                      {value ?? "N/A"}
                    </p>
                  )
                )}

                <h2 className="text-2xl font-semibold mt-6 mb-4">
                  Current Crop
                </h2>
                <p>{farmData.currentCrop || "N/A"}</p>

                <h2 className="text-2xl font-semibold mt-6 mb-4">
                  Fertilizer Needed
                </h2>
                {farmData.fertilizerNeeded?.length > 0 ? (
                  <ul>
                    {farmData.fertilizerNeeded.map((fertilizer, index) => (
                      <li key={index}>
                        <strong>{fertilizer.name}:</strong>{" "}
                        {fertilizer.quantity}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No fertilizer needed</p>
                )}
              </div>
            ) : (
              <p>Loading farm details...</p>
            )}
          </div>

          {/* Warnings and Notifications Section */}
          <div className="w-1/3 bg-yellow-100 dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              Warnings & Notifications
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              No warnings or notifications available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmPage;
