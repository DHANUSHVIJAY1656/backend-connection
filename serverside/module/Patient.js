const mongoose = require('mongoose');

// Define the schema for the KidneyDietForm
const kidneyDietFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true, min: 18, max: 100 },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  weight: { type: Number, required: true },
  heightCm: { type: Number },
  heightFt: { type: Number },
  heightIn: { type: Number },
  heightUnit: { type: String, enum: ['cm', 'ft'], required: true },
  dietType: { type: String, enum: ['Vegetarian', 'Non-Vegetarian', 'Flexitarian'], required: true },
  dietSubType: { type: String },
  flexOption: { type: String },
  activityLevel: { type: String, enum: ['Sedentary', 'Mildly Active', 'Moderately Active', 'Very Active'], required: true },
  kidneyDisease: { type: String, enum: ['Yes', 'No'], required: true },
  kidneyCondition: { type: String },
  comorbidities: [{ type: String }],
});

const KidneyDietForm = mongoose.model('KidneyDietForm', kidneyDietFormSchema);

module.exports = KidneyDietForm;
