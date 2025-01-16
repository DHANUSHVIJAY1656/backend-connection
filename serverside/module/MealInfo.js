const mongoose = require('mongoose');

const mealInfoSchema = new mongoose.Schema({
    mealOrder: { type: [String], required: true },
  });
  
  const MealInfo = mongoose.model("MealInfo", mealInfoSchema);