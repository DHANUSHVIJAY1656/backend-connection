import React, { useState } from "react";
// import axios from "axios";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const NutrientBreakdown = () => {
  // Declare the state variables
  const [weight, setWeight] = useState(0); // initial weight value
  const [heightInMeters, setHeightInMeters] = useState(0); // initial height value
  const [age, setAge] = useState(0); // age for calculation
  const [gender, setGender] = useState(""); // gender for calculation

  // State for results
  const [results, setResults] = useState({
    bmi: null,
    ibw: null,
    abw: null,
    weightDiff: null,
    calories: 0,
    protein: 0,
    fat: 0,
    carbs: 0,
  });
  const backendHandler = async (data) => {
    return new Promise((resolve, reject) => {
      try {
        const { weight, height, age, gender, results } = data;

        if (!weight || !height || !age || !gender) {
          return reject({ error: "Missing required fields" });
        }

        console.log("Simulating backend data save:", {
          weight,
          height,
          age,
          gender,
          results,
        });

        // Simulate backend delay
        setTimeout(() => {
          resolve({ message: "Data saved successfully" });
        }, 1000);
      } catch (error) {
        reject({ error: "Internal Server Error" });
      }
    });
  };

  // BMI, IBW, ABW calculations
  const calculateResults = () => {
    let bmi = 0;
    let ibw = 0;
    let abw = 0;
    let weightDiff = 0;

    if (weight && heightInMeters) {
      bmi = weight / (heightInMeters * heightInMeters);
    }

    if (bmi && weight) {
      ibw = 22 * (heightInMeters * heightInMeters); // Example IBW calculation
      abw = weight - ibw; // Adjusted Body Weight (ABW) calculation
      weightDiff = abw; // Difference from ideal weight
    }

    // Calculate the calories and nutrients
    const calories = Math.round(
      10 * weight + 6.25 * heightInMeters * 100 - 5 * age + (gender === "Male" ? 5 : -161)
    );
    const protein = Math.round(calories * 0.2 / 4);
    const fat = Math.round(calories * 0.3 / 9);
    const carbs = Math.round(calories * 0.5 / 4);

    setResults({
      bmi: bmi.toFixed(1),
      ibw: ibw.toFixed(1),
      abw: abw.toFixed(1),
      weightDiff: weightDiff.toFixed(1),
      calories,
      protein,
      fat,
      carbs,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
   
    calculateResults();
    
      try {
        
        const response = await backendHandler({url: 'http://localhost:5000/api/nutrients',
          weight,
          height: heightInMeters,
          age,
          gender,
          results,
        });
        console.log(response.message);
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
  

  return (
    <div>
      <h1>Nutrient Breakdown</h1>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit}>
        <label>
          Weight (kg):
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>
        <br />
        <label>
          Height (meters):
          <input
            type="number"
            value={heightInMeters}
            onChange={(e) => setHeightInMeters(e.target.value)}
          />
        </label>
        <br />
        <label>
          Age:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <br />
        <label>
          Gender:
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <br />
        <button type="submit">Submit My Details</button>
      </form>

      {/* Results */}
      <div>
        {results.bmi && <p>BMI: {results.bmi}</p>}
        {results.ibw && <p>IBW: {results.ibw}</p>}
        {results.abw && <p>ABW: {results.abw}</p>}
        {results.weightDiff && <p>Weight Difference: {results.weightDiff}</p>}
        {results.calories && (
          <div>
            <h3>Nutrition Breakdown</h3>
            <p>Calories: {results.calories} kcal</p>
            <p>Protein: {results.protein} g</p>
            <p>Fat: {results.fat} g</p>
            <p>Carbs: {results.carbs} g</p>
          </div>
        )}
      </div>

      {/* Tooltip Sections */}
      <div className="section">
        <h3>Total Calories (Energy)</h3>
        <p>Your recommended daily energy intake is approximately 2000 kcal.</p>
        <div
          className="pie-chart"
          style={{ width: "100%", height: "200px", backgroundColor: "#ccc" }}
        ></div>
        <span data-tip data-for="calories-tooltip">ℹ️</span>
        <Tooltip id="calories-tooltip" place="top" effect="solid">
          Calories are calculated based on your Adjusted Body Weight (ABW) and activity level.
        </Tooltip>
      </div>

      <div className="section">
        <h3>Protein Requirement</h3>
        <p>Your recommended daily protein intake is {results.protein}g/day.</p>
        <div
          className="progress-bar"
          style={{ width: "100%", height: "30px", backgroundColor: "#0d6efd" }}
        ></div>
        <span data-tip data-for="protein-tooltip">ℹ️</span>
        <Tooltip id="protein-tooltip" place="top" effect="solid">
          Protein intake is based on your kidney condition. For specialized diets, a supervised plan is recommended.
        </Tooltip>
      </div>

      <div className="section">
        <h3>Fat Intake</h3>
        <p>Your recommended daily fat intake is {results.fat}g/day.</p>
        <div className="pie-chart">{/* Fat Pie chart logic here */}</div>
        <span data-tip data-for="fat-tooltip">ℹ️</span>
        <Tooltip id="fat-tooltip" place="top" effect="solid">
          Focus on unsaturated fats like olive oil and nuts while limiting saturated fats.
        </Tooltip>
      </div>

      <div className="section">
        <h3>Carbohydrate Intake</h3>
        <p>Your recommended daily carbohydrate intake is {results.carbs}g/day.</p>
        <div className="progress-bar"></div>
        <span data-tip data-for="carbs-tooltip">ℹ️</span>
        <Tooltip id="carbs-tooltip" place="top" effect="solid">
          Carbs should come from complex sources like whole grains, vegetables, and legumes.
        </Tooltip>
      </div>
    </div>
  );
};
  
  export default NutrientBreakdown;
