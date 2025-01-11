const mongoose = require("mongoose");

const nutrientSchema = new mongoose.Schema({
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  carbs: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Nutrient = mongoose.model("Nutrient", nutrientSchema);

module.exports = Nutrient;
