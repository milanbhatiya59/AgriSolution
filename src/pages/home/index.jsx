import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import FarmCard from "./components/FarmCard";

const HomePage = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Fetch user data from the backend when the component mounts
  useEffect(() => {
    // if (user?.id) {
    //   fetch(`/api/user/${user.id}`) // Replace with your actual backend endpoint
    //     .then((response) => response.json())
    //     .then((data) => setUserData(data))
    //     .catch((error) => console.error("Error fetching user data:", error));
    // }
    setUserData({
      farms: [
        {
          name: "Green Valley Farm",
          location: "California, USA",
          size: 150,
        },
        {
          name: "Sunny Acres",
          location: "Florida, USA",
          size: 80,
        },
        {
          name: "Mountain View Farms",
          location: "Colorado, USA",
          size: 220,
        },
        {
          name: "Riverbend Organic Farm",
          location: "Oregon, USA",
          size: 120,
        },
        {
          name: "Apple Orchard Estate",
          location: "Washington, USA",
          size: 50,
        },
      ],
    });
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="text-lg font-semibold">
            👤 {user?.firstName}'s Information
          </div>
          <button
            onClick={() => navigate("/create")}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-bold rounded-lg shadow-md hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            + Create New Farm
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <div className="grid grid-cols-3 gap-4">
            {userData ? (
              userData.farms.map((farm) => (
                <FarmCard key={farm.id} farm={farm} />
              ))
            ) : (
              <div>Loading user farms...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
