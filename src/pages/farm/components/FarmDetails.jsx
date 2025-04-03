import { useState, useEffect } from "react";
import { useLanguage } from "../../../context/LanguageContext";
import { translateText } from "../../../utils/translate";

const FarmDetails = ({ farmData }) => {
  const { language } = useLanguage();
  const [translatedLabels, setTranslatedLabels] = useState({});
  const [translatedData, setTranslatedData] = useState(null);

  const labels = {
    loading: "Loading farm details...",
    farmerDetails: "Farmer Details",
    name: "Name",
    address: "Address",
    village: "Village",
    subDistrict: "Sub-District",
    district: "District",
    pin: "PIN",
    soilHealthCard: "Soil Health Card",
    cardNumber: "Card Number",
    validity: "Validity",
    soilSampleDetails: "Soil Sample Details",
    sampleNumber: "Sample Number",
    surveyNumber: "Survey Number",
    farmSize: "Farm Size (Hectares)",
    latitude: "Latitude",
    longitude: "Longitude",
    soilTestResults: "Soil Test Results",
    noTestResults: "No soil test results available.",
    currentCrop: "Current Crop",
    fertilizerNeeded: "Fertilizer Needed",
    noFertilizer: "No fertilizer needed",
  };

  useEffect(() => {
    const translateContent = async () => {
      const translatedLabelsObj = {};
      for (const key in labels) {
        translatedLabelsObj[key] = await translateText(labels[key], language);
      }
      setTranslatedLabels(translatedLabelsObj);

      if (farmData) {
        const translatedFarmData = {
          farmersDetails: {
            name: farmData.farmersDetails?.name
              ? await translateText(farmData.farmersDetails.name, language)
              : "N/A",
            address: farmData.farmersDetails?.address
              ? await translateText(farmData.farmersDetails.address, language)
              : "N/A",
            village: farmData.farmersDetails?.village
              ? await translateText(farmData.farmersDetails.village, language)
              : "N/A",
            subDistrict: farmData.farmersDetails?.subDistrict
              ? await translateText(
                  farmData.farmersDetails.subDistrict,
                  language
                )
              : "N/A",
            district: farmData.farmersDetails?.district
              ? await translateText(farmData.farmersDetails.district, language)
              : "N/A",
            PIN: farmData.farmersDetails?.PIN || "N/A",
          },
          soilHealthCard: {
            soilHealthCardNo:
              farmData.soilHealthCard?.soilHealthCardNo || "N/A",
            validityFrom: farmData.soilHealthCard?.validityFrom || "N/A",
            validityTo: farmData.soilHealthCard?.validityTo || "N/A",
          },
          soilSampleDetails: {
            soilSampleNumber:
              farmData.soilSampleDetails?.soilSampleNumber || "N/A",
            surveyNo: farmData.soilSampleDetails?.surveyNo || "N/A",
            farmSizeInHector:
              farmData.soilSampleDetails?.farmSizeInHector || "N/A",
            geoPositionLatitude:
              farmData.soilSampleDetails?.geoPositionLatitude || "N/A",
            geoPositionLongitude:
              farmData.soilSampleDetails?.geoPositionLongitude || "N/A",
          },
          soilTestResults: farmData.soilTestResults || {},
          currentCrop: farmData.currentCrop
            ? await translateText(farmData.currentCrop, language)
            : "N/A",
          fertilizerNeeded: farmData.fertilizerNeeded?.length
            ? await Promise.all(
                farmData.fertilizerNeeded.map(async (fertilizer) => ({
                  name: await translateText(fertilizer.name, language),
                  quantity: fertilizer.quantity,
                }))
              )
            : [],
        };
        setTranslatedData(translatedFarmData);
      }
    };

    translateContent();
  }, [language, farmData]);

  if (!farmData || !translatedData) {
    return (
      <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <p>{translatedLabels.loading || "Loading farm details..."}</p>
      </div>
    );
  }

  return (
    <div className="w-2/3 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
      <p className="text-lg mb-6">
        Viewing details for Farm ID: <strong>{farmData.id || "N/A"}</strong>
      </p>

      <h2 className="text-2xl font-semibold mb-4">
        {translatedLabels.farmerDetails}
      </h2>
      <p>
        <strong>{translatedLabels.name}:</strong>{" "}
        {translatedData.farmersDetails.name}
      </p>
      <p>
        <strong>{translatedLabels.address}:</strong>{" "}
        {translatedData.farmersDetails.address}
      </p>
      <p>
        <strong>{translatedLabels.village}:</strong>{" "}
        {translatedData.farmersDetails.village}
      </p>
      <p>
        <strong>{translatedLabels.subDistrict}:</strong>{" "}
        {translatedData.farmersDetails.subDistrict}
      </p>
      <p>
        <strong>{translatedLabels.district}:</strong>{" "}
        {translatedData.farmersDetails.district}
      </p>
      <p>
        <strong>{translatedLabels.pin}:</strong>{" "}
        {translatedData.farmersDetails.PIN}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {translatedLabels.soilHealthCard}
      </h2>
      <p>
        <strong>{translatedLabels.cardNumber}:</strong>{" "}
        {translatedData.soilHealthCard.soilHealthCardNo}
      </p>
      <p>
        <strong>{translatedLabels.validity}:</strong>{" "}
        {translatedData.soilHealthCard.validityFrom} -{" "}
        {translatedData.soilHealthCard.validityTo}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {translatedLabels.soilSampleDetails}
      </h2>
      <p>
        <strong>{translatedLabels.sampleNumber}:</strong>{" "}
        {translatedData.soilSampleDetails.soilSampleNumber}
      </p>
      <p>
        <strong>{translatedLabels.surveyNumber}:</strong>{" "}
        {translatedData.soilSampleDetails.surveyNo}
      </p>
      <p>
        <strong>{translatedLabels.farmSize}:</strong>{" "}
        {translatedData.soilSampleDetails.farmSizeInHector}
      </p>
      <p>
        <strong>{translatedLabels.latitude}:</strong>{" "}
        {translatedData.soilSampleDetails.geoPositionLatitude}
      </p>
      <p>
        <strong>{translatedLabels.longitude}:</strong>{" "}
        {translatedData.soilSampleDetails.geoPositionLongitude}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {translatedLabels.soilTestResults}
      </h2>
      {Object.keys(translatedData.soilTestResults).length > 0 ? (
        Object.entries(translatedData.soilTestResults).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {value ?? "N/A"}
          </p>
        ))
      ) : (
        <p>{translatedLabels.noTestResults}</p>
      )}

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {translatedLabels.currentCrop}
      </h2>
      <p>{translatedData.currentCrop}</p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">
        {translatedLabels.fertilizerNeeded}
      </h2>
      {translatedData.fertilizerNeeded.length > 0 ? (
        <ul>
          {translatedData.fertilizerNeeded.map((fertilizer, index) => (
            <li key={index}>
              <strong>{fertilizer.name}:</strong> {fertilizer.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>{translatedLabels.noFertilizer}</p>
      )}
    </div>
  );
};

export default FarmDetails;
