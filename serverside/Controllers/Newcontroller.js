const mongoose = require("mongoose");

const FormData = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
  },
  age: {
    type: Number,
    min: 18,
    max: 100,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  weight: {
    type: Number,
  },
  heightCm: {
    type: Number,
  },
  heightFt: {
    type: Number,
  },
  heightIn: {
    type: Number,
  },
  heightUnit: {
    type: String,
   
    enum: ["cm", "ft"],
  },
  dietType: {
    type: String,
    
    enum: ["Vegetarian", "Non-Vegetarian"],
  },
  subDietType: {
    type: String,
    required: function () {
      return this.dietType === "Vegetarian" || this.dietType === "Non-Vegetarian";
    },
    enum: [
      "Lacto",
      "Ovo",
      "Vegan",
      "Pescatarian",
      "Poultry-based",
      "Red Meat-based",
      "Flexitarion",
    ],
  },
  flexSubOption: {
    type: String,
  },
  activityLevel: {
    type: String,
    enum: ["Sedentary", "Mildly Active", "Moderately Active", "Very Active"],
  },
  hasKidneyDisease: {
    type: Boolean,
 
  },
  kidneyCondition: {
    type: String,
    trim: true,
  },
  otherConditions: {
    type: [String],
    enum: [
      "Diabetes",
      "Hypertension",
      "Gout",
      "Cardiovascular Disease",
      "Other",
    ],
  },
  otherConditionDetails: {
    type: String, 
    default: null 
  },
  bmi: {
    type: Number,
    required: true,
    min: 0, 
  },
  ibw: {
    type: Number,
    required: true,
    min: 0,
  },
  abw: {
    type: Number,
    required: true,
    min: 0, 
  },
  weightDiff: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true, 
});


// Mongoose Model
 const DietForm = mongoose.model('DietForm', FormData);
 module.exports = DietForm;
