const CalculateTotalCalories = (abw, activityLevel) => {
    const calorieMultipliers = {
      sedentary: 25,
      mildlyActive: 27.5,
      moderatelyActive: 30,
      veryActive: 35,
    };
  
    return abw * calorieMultipliers[activityLevel] || 2200; 
  };
  
  // Calculate Protein intake based on kidney condition
  const calculateProtein = (kidneyCondition, abw) => {
    const proteinMultipliers = {
      CKD: 0.6,
      dialysis: 1.2,
      transplant: 0.8,
    };
  
    return abw * proteinMultipliers[kidneyCondition] || 60; 
  };
  
  module.exports = { CalculateTotalCalories, calculateProtein };
  