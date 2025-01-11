import React, { useState } from "react";
import NutrientBreakdown from "./NutrientBreakdown";
import DietRecommendation from "./DietRecommendation";
import DietChartDownload from "./DietChartDownload";

const Diet = () => {
  const [condition, setCondition] = useState("CKD"); // Example condition: CKD, Dialysis, or Transplant
  const calories = 2200;  // Example for demo purposes
  const protein = 60;     // Example for demo purposes
  const fat = 73;         // Example for demo purposes
  const carbs = 250;      // Example for demo purposes

  return (
    <div className="App">
      <NutrientBreakdown calories={calories} protein={protein} fat={fat} carbs={carbs} />
      <DietRecommendation condition={condition} />
      <DietChartDownload calories={calories} protein={protein} dietType="Non-Veg" />
    </div>
  );
};

export default Diet;

