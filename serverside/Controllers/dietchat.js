const mongoose = require('mongoose');

// Create a schema for the personalized diet form
const deitSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  mealsPerDay: String,
  snacksPerDay: String,
  majorityFoodConsumption: String,
  foodAllergies: String,
  allergiesDetails: String,
  dietaryRestrictions: String,
  restrictionsDetails: String,
  mealDistribution: [String], 
});

const deitinfo = mongoose.model('deitinfo',deitSchema);
module.exports=deitinfo;

