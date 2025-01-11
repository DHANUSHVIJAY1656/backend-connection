const mongoose = require('mongoose');

// Define the schema for the diet form
const dietFormSchema = new mongoose.Schema({
  abw: { type: Number, required: true },
  activityLevel: { type: String, required: true },
  kidneyCondition: { type: String, required: true },
  dietType: { type: String, required: true },
  calories: { type: Number },
  protein: { type: Number },
  fat: { type: Number },
  carbs: { type: Number },
  potassium: { type: Number },
  phosphorus: { type: Number },
  guidelines: { type: String },
});

// Create a DietForm model
const DietForm = mongoose.model('personalpiechat', dietFormSchema);

module.exports = DietForm;
