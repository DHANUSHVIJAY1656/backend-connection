// index.js

// Function to calculate total calories
const CalculateTotalCalories = (abw, activityLevel) => {
  const calorieMultipliers = {
      sedentary: 25,
      mildlyActive: 27.5,
      moderatelyActive: 30,
      veryActive: 35,
  };

  return abw * calorieMultipliers[activityLevel] || 2200; // Default to 2200 if the activity level is invalid
};

// Function to calculate protein intake based on kidney condition
const calculateProtein = (kidneyCondition, abw) => {
  const proteinMultipliers = {
      CKD: 0.6,
      dialysis: 1.2,
      transplant: 0.8,
  };

  return abw * proteinMultipliers[kidneyCondition] || 60; // Default to 60 if the kidney condition is invalid
};

// Exporting the functions so they can be used in other files
module.exports = { CalculateTotalCalories, calculateProtein };
