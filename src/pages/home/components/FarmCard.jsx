import { useNavigate } from "react-router-dom";

const FarmCard = ({ farm }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/farm/${farm._id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
    >
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        🌾 Farm ID: {farm._id}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>📍 Location:</strong>{" "}
        {farm.soilSampleDetails.geoPositionLatitude},{" "}
        {farm.soilSampleDetails.geoPositionLongitude}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>📏 Size:</strong> {farm.soilSampleDetails.farmSizeInHector}{" "}
        hectares
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>🌱 Current Crop:</strong> {farm.currentCrop || "Not Set"}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        <strong>🧪 Soil Sample No:</strong>{" "}
        {farm.soilSampleDetails.soilSampleNumber || "N/A"}
      </div>
    </div>
  );
};

export default FarmCard;
