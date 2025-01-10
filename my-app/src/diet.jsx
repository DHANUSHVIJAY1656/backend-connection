import React from 'react';
// import { Tooltip, ProgressBar, PieChart } from 'some-ui-library';
import { CircularProgress } from '@mui/material';
import { Tooltip } from '@mui/material';
import {PieChart} from'recharts';

const NutrientBreakdown = ({ abw, activityLevel, kidneyCondition, dietType }) => {
  // Helper functions for backend calculations
  const calculateCalories = (abw, activityLevel) => {
    const activityMultiplier = {
      Sedentary: 25,
      "Mildly Active": 27.5,
      "Moderately Active": 30,
      "Very Active": 35,
    };
    return abw * activityMultiplier[activityLevel];
  };

  const calculateProtein = (abw, kidneyCondition) => {
    const proteinMultiplier = {
      CKD: 0.6,
      Dialysis: 1.2,
      Transplant: 0.8,
    };
    return abw * proteinMultiplier[kidneyCondition];
  };

  const calculateFat = (calories) => {
    const fatCalories = calories * 0.3;
    const fatGrams = fatCalories / 9;
    return {
      total: fatGrams,
      unsaturated: fatGrams * 0.7,
      saturated: fatGrams * 0.3,
    };
  };

  const calculateCarbs = (calories, proteinGrams, fatGrams) => {
    const proteinCalories = proteinGrams * 4;
    const fatCalories = fatGrams * 9;
    const remainingCalories = calories - (proteinCalories + fatCalories);
    return remainingCalories / 4;
  };

  const calculateMicronutrients = () => ({
    potassium: 2000, // Default guideline for CKD
    phosphorus: 1200, // Default guideline for CKD
  });

  // Dynamic data calculations
  const totalCalories = calculateCalories(abw, activityLevel);
  const protein = calculateProtein(abw, kidneyCondition);
  const fat = calculateFat(totalCalories);
  const carbs = calculateCarbs(totalCalories, protein, fat.total);
  const micronutrients = calculateMicronutrients();

  return (
    <div className="nutrient-breakdown">
      <h1>My Nutrient Breakdown</h1>
      <p>
        Here’s a summary of your daily nutritional needs based on your weight, activity level,
        and kidney health. This breakdown will help guide you in achieving the right balance for a
        kidney-friendly diet.
      </p>

      {/* Total Calories Section */}
      <section>
        <h2>Total Calories (Energy)</h2>
        <p>Your recommended daily energy intake is approximately {totalCalories.toFixed(0)} kcal.</p>
        <CircularProgress  variant="determinate" value={75}
          segments={[
            { label: "Protein", value: (protein * 4) / totalCalories * 100, color: "#007bff" },
            { label: "Fat", value: (fat.total * 9) / totalCalories * 100, color: "#28a745" },
            { label: "Carbs", value: (carbs * 4) / totalCalories * 100, color: "#ffc107" },
          ]}
        />
        <Tooltip text="Your total daily energy requirement is calculated based on your Adjusted Body Weight (ABW) and activity level. This ensures you get the right amount of energy for your specific needs." />
      </section>

      {/* Protein Section */}
      <section>
        <h2>Protein Requirement</h2>
        <p>Your recommended daily protein intake is {protein.toFixed(0)}g/day.</p>
        <CircularProgress 
          value={(protein / (abw * 1.5)) * 100} // Assuming max 1.5g/kg/day for visualization
          color="#007bff"
        />
        <Tooltip text="Protein intake is scientifically moderated to support kidney health. If you need a specialized plan (like keto or VLPD), a supervised diet is essential to prevent kidney strain and malnutrition." />
      </section>

      {/* Fat Section */}
      <section>
        <h2>Fat Intake</h2>
        <p>Your recommended daily fat intake is approximately {fat.total.toFixed(0)}g/day.</p>
        <PieChart
          segments={[
            { label: "Unsaturated Fat", value: fat.unsaturated, color: "#28a745" },
            { label: "Saturated Fat", value: fat.saturated, color: "#dc3545" },
          ]}
        />
        <Tooltip text="Focus on unsaturated fats (like mustard oil, sunflower oil, olive oil, avocado, and nuts) to support kidney and heart health. Limit saturated fats (like butter and ghee) for better kidney function." />
      </section>

      {/* Carbohydrates Section */}
      <section>
        <h2>Carbohydrate Intake</h2>
        <p>Your recommended daily carbohydrate intake is approximately {carbs.toFixed(0)}g/day.</p>
        <CircularProgress 
          value={(carbs / 325) * 100} // Assuming 325g as a max reference for visualization
          color="#ffc107"
        />
        <Tooltip text="Carbohydrates should come from complex carbs like whole grains, vegetables, and legumes. This helps provide steady energy and supports kidney health." />
      </section>

      {/* Micronutrients Section */}
      <section>
        <h2>Micronutrient Requirements</h2>
        <p>Your recommended daily potassium intake is approximately {micronutrients.potassium} mg.</p>
        <p>Your recommended daily phosphorus intake is approximately {micronutrients.phosphorus} mg.</p>
        <Tooltip text="Potassium and phosphorus intake need to be carefully managed. Too much can strain your kidneys, so understanding and moderation is key." />
      </section>
    </div>
  );
};

export default NutrientBreakdown;
