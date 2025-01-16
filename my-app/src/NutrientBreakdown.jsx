import React, { useState } from "react";
import "react-tooltip/dist/react-tooltip.css";
import DietChartDownload from "./DietChartDownload";

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
    const protein = Math.round((calories * 0.2) / 4);
    const fat = Math.round((calories * 0.3) / 9);
    const carbs = Math.round((calories * 0.5) / 4);

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
  
    calculateResults(); // Calculate BMI, IBW, ABW, and nutrients
  
    try {
      const response = await fetch("http://localhost:5000/api/nutrients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weight,
          height: heightInMeters,
          age,
          gender,
          bmi: results.bmi,
          ibw: results.ibw,
          abw: results.abw,
          weightDiff: results.weightDiff,
          calories: results.calories,
          protein: results.protein,
          fat: results.fat,
          carbs: results.carbs,
        }),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.message);
        alert("Data submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error submitting data:", errorData);
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred while submitting data.");
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
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
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

      {/* Diet Chart Download Component */}
      {results.calories > 0 && (
        <DietChartDownload
          calories={results.calories}
          protein={results.protein}
          dietType="Balanced Diet" 
        />
      )}
    </div>
  );
};

export default NutrientBreakdown;
