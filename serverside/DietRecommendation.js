const mongoose = require("mongoose");

const dietRecommendationSchema = new mongoose.Schema({
  condition: {
    type: String,
    enum: ["CKD", "Dialysis", "Transplant"],
    required: true,
  },
  recommendation: {
    type: String,
    required: true,
  },
  tooltip: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const DietRecommendation = mongoose.model("DietRecommendation", dietRecommendationSchema);

module.exports = DietRecommendation;
