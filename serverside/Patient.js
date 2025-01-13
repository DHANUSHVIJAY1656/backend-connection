const mongoose = require('mongoose');

const dietSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  weight: { type: Number, required: true },
  heightCm: { type: Number },
  heightFt: { type: Number },
  heightIn: { type: Number },
  heightUnit: { type: String, default: "cm" },
  dietType: { type: String, required: true },
  subDietType: { type: String },
  activityLevel: { type: String, required: true },
  hasKidneyDisease: { type: Boolean, required: true },
  kidneyCondition: { type: String },
  otherConditions: { type: [String] },
  otherConditionDetails: { type: String },
  calories: { type: Number, required: true }, // Ensure calories is defined
  idealWeight: { type: Number },
  adjustedWeight: { type: Number },
  bmi: { type: Number },
  weightDifference: { type: Number },
});


module.exports = mongoose.model('Diets', dietSchema);

// module.exports = Patient;
