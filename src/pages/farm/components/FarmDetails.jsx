const FarmDetails = ({ farmData }) => {
  if (!farmData) {
    return (
      <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <p>Loading farm details...</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <p className="text-lg mb-6">
        Viewing details for Farm ID: <strong>{farmData?.id || "N/A"}</strong>
      </p>

      <h2 className="text-2xl font-semibold mb-4">Farmer Details</h2>
      <p>
        <strong>Name:</strong> {farmData.farmersDetails?.name || "N/A"}
      </p>
      <p>
        <strong>Address:</strong> {farmData.farmersDetails?.address || "N/A"}
      </p>
      <p>
        <strong>Village:</strong> {farmData.farmersDetails?.village || "N/A"}
      </p>
      <p>
        <strong>Sub-District:</strong>{" "}
        {farmData.farmersDetails?.subDistrict || "N/A"}
      </p>
      <p>
        <strong>District:</strong> {farmData.farmersDetails?.district || "N/A"}
      </p>
      <p>
        <strong>PIN:</strong> {farmData.farmersDetails?.PIN || "N/A"}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Soil Health Card</h2>
      <p>
        <strong>Card Number:</strong>{" "}
        {farmData.soilHealthCard?.soilHealthCardNo || "N/A"}
      </p>
      <p>
        <strong>Validity:</strong>{" "}
        {farmData.soilHealthCard?.validityFrom || "N/A"} -{" "}
        {farmData.soilHealthCard?.validityTo || "N/A"}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Soil Sample Details</h2>
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

      <h2 className="text-2xl font-semibold mt-6 mb-4">Soil Test Results</h2>
      {farmData.soilTestResults ? (
        Object.entries(farmData.soilTestResults).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {value ?? "N/A"}
          </p>
        ))
      ) : (
        <p>No soil test results available.</p>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-4">Current Crop</h2>
      <p>{farmData.currentCrop || "N/A"}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Fertilizer Needed</h2>
      {farmData.fertilizerNeeded?.length > 0 ? (
        <ul>
          {farmData.fertilizerNeeded.map((fertilizer, index) => (
            <li key={index}>
              <strong>{fertilizer.name}:</strong> {fertilizer.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>No fertilizer needed</p>
      )}
    </div>
  );
};

export default FarmDetails;
