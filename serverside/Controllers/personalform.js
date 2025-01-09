
const mongoose = require('mongoose');

// Create a schema for the personalized diet form
const personalFormSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  mealsPerDay: String,
  mealsText: String,
  snacksPerDay: String,
  snacksText: String,
  mealTimes: {
    breakfast: { time: String, ampm: String },
    lunch: { time: String, ampm: String },
    dinner: { time: String, ampm: String },
  },
});

// Create a model for the diet form
const personalinfo = mongoose.model('personalinfo', personalFormSchema);
module.exports = personalinfo;