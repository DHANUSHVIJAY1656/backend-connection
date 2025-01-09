
const mongoose = require('mongoose');

// Create a schema for the personalized diet form
const dietFormSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  mealsPerDay: String,
  mealsText: String,
  snacksPerDay: String,
  snacksText: String,
  majorityFoodConsumption: String,
  foodAllergies: String,
  allergiesText: String,
  dietaryRestrictions: String,
  restrictionsText: String,
  mealOrder: [String],
  dietGoals: [String],
  goalOtherText: String,
});

// Create a model for the diet form
const personalform = mongoose.model('personalform', dietFormSchema);
module.exports = personalform;





