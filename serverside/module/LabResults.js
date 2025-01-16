const mongoose = require('mongoose');

const LabResultSchema = new mongoose.Schema({
  hemoglobin: { type: Number, required: true },
  creatinine: { type: Number, required: true },
  potassium: { type: Number, required: true },
  phosphorus: { type: Number, required: true },
  ipth: { type: Number, required: true },
  vitaminD: { type: Number, required: true },
  filePaths: [{ type: String }], // To store file paths of uploaded files
}, { timestamps: true });

const LabResult = mongoose.model('LabResult', LabResultSchema);
module.exports = LabResult;
