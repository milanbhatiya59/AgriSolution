import { useState, useEffect } from "react";
import { getNotification } from "../../../api/getNotification";
import { format } from "date-fns";

const Notifications = ({ id }) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await getNotification(id);
        setNotifications(response?.tasks || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, [id]);

  // Filter notifications based on selected date
  const filteredNotifications = notifications.filter(
    (notif) => format(new Date(notif.date), "yyyy-MM-dd") === selectedDate
  );

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-6">📢 Notifications</h2>

      {/* Date Filter */}
      <div className="mb-6">
        <label className="block mb-2 text-lg font-medium">Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="p-2 rounded-md border bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none"
        />
      </div>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <ul className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          {filteredNotifications.map((notif, index) => (
            <li
              key={index}
              className="p-4 border-b dark:border-gray-700 flex flex-col md:flex-row md:justify-between"
            >
              <div>
                <p className="text-lg font-semibold">{notif.taskType}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {notif.description}
                </p>
                {notif.quantity && notif.unit && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">Quantity:</span>{" "}
                    {notif.quantity} {notif.unit}
                  </p>
                )}
              </div>
              <span
                className={`mt-2 md:mt-0 inline-block px-3 py-1 rounded-full text-xs font-bold self-start md:self-center ${
                  notif.status === "Pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {notif.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700 dark:text-gray-400 text-lg mt-4">
          📭 No notifications available for the selected date.
        </p>
      )}
    </div>
  );
};

export default Notifications;
