const mongoose = require("mongoose");

// Personal Info Schema
const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const PersonalInfo = mongoose.model("PersonalInfo", personalInfoSchema);

// Meal Info Schema
const mealInfoSchema = new mongoose.Schema({
  mealOrder: { type: [String], required: true },
});

const MealInfo = mongoose.model("MealInfo", mealInfoSchema);

// Lab Results Schema
const labResultsSchema = new mongoose.Schema({
  hemoglobin: { type: Number, required: true },
  creatinine: { type: Number, required: true },
  potassium: { type: Number, required: true },
  phosphorus: { type: Number, required: true },
  ipth: { type: Number, required: true },
  vitaminD: { type: Number, required: true },
});

const LabResults = mongoose.model("LabResults", labResultsSchema);

module.exports = { PersonalInfo, MealInfo, LabResults };