const mongoose = require('mongoose');

const labResultsSchema = new mongoose.Schema({
  personalInfo: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  mealInfo: {
    mealOrder: { type: [String], required: true },
  },
  labResults: {
    hemoglobin: { type: Number, required: true },
    creatinine: { type: Number, required: true },
    potassium: { type: Number, required: true },
    phosphorus: { type: Number, required: true },
    ipth: { type: Number, required: true },
    vitaminD: { type: Number, required: true },
  },
});

const LabResults = mongoose.model('LabResults', labResultsSchema);

module.exports = LabResults;
