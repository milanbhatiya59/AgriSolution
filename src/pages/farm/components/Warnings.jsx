import { useState, useEffect } from "react";
import { getWarning } from "../../../api/getWarning";
import { AlertTriangle } from "lucide-react";

const Warning = ({ farmData }) => {
  const [warning, setWarning] = useState(null);

  useEffect(() => {
    if (!farmData) return;

    const fetchWarning = async () => {
      try {
        const response = await getWarning(farmData);
        setWarning(response);
      } catch (err) {
        console.error("Error fetching warning:", err);
      }
    };

    fetchWarning();
  }, [farmData]);

  if (!farmData) {
    return (
      <div className="w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <p className="text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-red-100 dark:bg-red-900 shadow-lg rounded-lg p-6 border-l-8 border-red-700">
      <h2 className="text-2xl font-bold text-red-800 dark:text-red-400 flex items-center">
        <AlertTriangle className="w-6 h-6 mr-2" /> Warnings
      </h2>

      {warning ? (
        <div className="space-y-4 mt-4">
          {warning.weather && (
            <div className="bg-red-200 dark:bg-red-800 p-4 rounded-md shadow">
              <h3 className="font-semibold text-red-900 dark:text-red-300">
                ⚠️ Weather Warning:
              </h3>
              <p className="text-red-700 dark:text-red-400">
                {warning.weather}
              </p>
            </div>
          )}

          {warning.soilHealth && (
            <div className="bg-red-200 dark:bg-red-800 p-4 rounded-md shadow">
              <h3 className="font-semibold text-red-900 dark:text-red-300">
                ⚠️ Soil Health Warning:
              </h3>
              <p className="text-red-700 dark:text-red-400">
                {warning.soilHealth}
              </p>
            </div>
          )}

          {warning.cropHealth && (
            <div className="bg-red-200 dark:bg-red-800 p-4 rounded-md shadow">
              <h3 className="font-semibold text-red-900 dark:text-red-300">
                ⚠️ Crop Health Warning:
              </h3>
              <p className="text-red-700 dark:text-red-400">
                {warning.cropHealth}
              </p>
            </div>
          )}
        </div>
      ) : (
        <p className="text-red-700 dark:text-red-400">No warnings available.</p>
      )}
    </div>
  );
};

export default Warning;
