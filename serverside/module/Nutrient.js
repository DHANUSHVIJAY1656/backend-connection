const mongoose = require('mongoose');

const nutrientSchema = new mongoose.Schema({
  weight: { type: Number, required: true },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  bmi: { type: Number },
  ibw: { type: Number },
  abw: { type: Number },
  weightDiff: { type: Number},
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
});

const Nutrient = mongoose.model("Nutrient", nutrientSchema);
module.exports = Nutrient;