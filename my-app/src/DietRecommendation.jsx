import React, { useState } from "react";
import DietChartDownload from "./DietChartDownload"; 
import NutrientBreakdown from "./NutrientBreakdown";
const Diet = () => {
  const [condition] = useState("CKD"); // Example condition
  const calories = 2200;  // Example calorie value
  const protein = 60;     // Example protein value
  const fat = 73;         // Example fat value
  const carbs = 250;      // Example carbs value

  // Recommendations based on condition
  const recommendations = {
    CKD: "Low-protein, low-sodium diet is recommended.",
    Dialysis: "High-protein diet is recommended.",
    Transplant: "Balanced diet with reduced restrictions is recommended.",
  };

  return (
    <div className="App">
      {/* Nutrient Breakdown Section */}
      <h2>Nutrient Breakdown</h2>
      <p>Calories: {calories} kcal</p>
      <p>Protein: {protein} g</p>
      <p>Fat: {fat} g</p>
      <p>Carbs: {carbs} g</p>

      {/* Diet Recommendation Section */}
      <h2>Diet Recommendation</h2>
      <p>{recommendations[condition] || "General healthy diet is recommended."}</p>

      {/* Download Diet Chart Section */}
      <DietChartDownload 
        calories={calories} 
        protein={protein} 
        dietType="CKD-friendly" 
      />
    </div>
  );
};

export default Diet;
