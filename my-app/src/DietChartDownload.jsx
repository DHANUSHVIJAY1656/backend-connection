import React from "react";

const DietChartDownload = ({ calories, protein, dietType }) => {
  const downloadDietChart = () => {
    // Logic for downloading the chart (You can use Blob, a PDF library, or generate an image)
    alert(`Downloading a ${dietType} diet chart with ${calories} kcal and ${protein}g of protein.`);
  };

  return (
    <div>
      <h3>Download Your Generic Diet Chart</h3>
      <p>
        Your recommended daily intake is {calories} kcal with {protein}g of protein. Diet Type:{" "}
        {dietType}
      </p>
      <button onClick={downloadDietChart}>Download Diet Chart</button>
    </div>
  );
};

export default DietChartDownload;
