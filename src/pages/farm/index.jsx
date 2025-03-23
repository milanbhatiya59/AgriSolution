import Warnings from "./components/Warnings";
import Notifications from "./components/Notifications";
import PestAndDiseaseDetection from "./components/PestAndDiseaseDetection";
import FarmDetails from "./components/FarmDetails";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFarmById } from "../../api/getFarmById";

const FarmPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
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
      <div className="max-w-8xl mx-auto px-6 py-8 space-y-6">
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
          <FarmDetails farmData={farmData} />
          <div className="w-1/3 bg-yellow-100 dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <div className="mb-6">
              <Warnings farmData={farmData} />
            </div>
            <div>
              <Notifications id={id} />
            </div>
          </div>
          <div className="w-1/3 bg-yellow-100 dark:bg-gray-800 shadow-lg rounded-lg p-6">
            <PestAndDiseaseDetection farmData={farmData} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FarmPage;
