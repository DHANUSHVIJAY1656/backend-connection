import React, { useState } from "react";
import { Tooltip } from 'react-tooltip'; 




const NutrientBreakdown = ({ calories, protein, fat, carbs }) => {
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nutrientData = {
      calories,
      protein,
      fat,
      carbs,
    };

    try {
     
      const response = await fetch("http://localhost:5000/api/nutrient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nutrientData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus("Data saved successfully!");
      } else {
        setStatus("Error saving data.");
      }
    } catch (err) {
      setStatus("Error connecting to the backend.");
    }
  };

  const calculateFat = (calories) => calories * 0.3 / 9;


  return (
    <div>
      <h2>My Nutrient Breakdown</h2>

    
     <div className="section">
        <h3>Total Calories (Energy)</h3>
        <p>Your recommended daily energy intake is approximately 2000 kcal.</p>
        <div
          className="pie-chart"
          style={{ width: "100%", height: "200px", backgroundColor: "#ccc" }}
        >
          
        </div>
        <button data-tip data-for="calories-tooltip">ℹ️</button>
        <Tooltip id="calories-tooltip" place="top" effect="solid">
          "Calories are calculated based on your Adjusted Body Weight (ABW) and activity level."
        </Tooltip>
      </div>

     
      <div className="section">
        <h3>Protein Requirement</h3>
        <p>Your recommended daily protein intake is 150g/day.</p>
        <div className="progress-bar" style={{ width: "100%", height: "30px", backgroundColor: "#0d6efd" }}></div>
        <button data-tip data-for="protein-tooltip">ℹ️</button>
        <Tooltip id="protein-tooltip" place="top" effect="solid">
          "Protein intake is based on your kidney condition. For specialized diets, a supervised plan is recommended."
        </Tooltip>
      
      </div>

      <div className="section">
        <h3>Fat Intake</h3>
        <p>Your recommended daily fat intake is {calculateFat(calories)}g/day.</p>
        <div className="pie-chart">
          {/* Fat Pie chart logic here */}
        </div>
        <button data-tip data-for="fat-tooltip">ℹ️</button>
        <Tooltip id="fat-tooltip" place="top" effect="solid">
    Focus on unsaturated fats like olive oil and nuts while limiting saturated fats.
        </Tooltip>
      </div>

      <div className="section">
        <h3>Carbohydrate Intake</h3>
        <p>Your recommended daily carbohydrate intake is {carbs}g/day.</p>
        <div className="progress-bar"></div>
        <button data-tip data-for="carbs-tooltip">ℹ️</button>
        <Tooltip id="carbs-tooltip" place="top" effect="solid">
          "Carbs should come from complex sources like whole grains, vegetables, and legumes."
        </Tooltip>
      </div>

      <div className="section">
        <h3>Potassium & Phosphorus Requirements</h3>
        <p>Recommendations depend on blood levels and CKD stage.</p>
        <button data-tip data-for="micronutrients-tooltip">ℹ️</button>
        <Tooltip id="micronutrients-tooltip" place="top" effect="solid">
          "Potassium and phosphorus intake needs to be managed according to your lab reports."
        </Tooltip>
      </div>
      <div>
        <p>{status}</p>
      </div>
    </div>
  );
};

export default NutrientBreakdown;
