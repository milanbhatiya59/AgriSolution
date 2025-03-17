const FarmCard = ({ farm }) => {
  return (
    <div className="p-8 bg-gray-200 dark:bg-gray-700 rounded-lg shadow-lg max-w-md">
      <div className="text-lg font-semibold text-gray-900 dark:text-white">
        {farm.name}
      </div>
      <div className="mt-4 text-gray-700 dark:text-gray-300">
        Location: {farm.location}
      </div>
      <div className="mt-2 text-gray-700 dark:text-gray-300">
        Size: {farm.size} acres
      </div>
    </div>
  );
};

export default FarmCard;
