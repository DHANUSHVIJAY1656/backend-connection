const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  weight: Number,
  heightCm: Number,
  heightFeet: Number,
  heightInches: Number,
  dietType: String,
  activityLevel: String,
  kidneyDisease: String,
  comorbidities: [String],
  idealWeight: Number,
  adjustedWeight: Number,
  bmi: Number,
  bmiCategory: String,
  weightDifference: Number,
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
