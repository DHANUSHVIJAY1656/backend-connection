// models/PersonalInfo.js

const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const PersonalInfo = mongoose.model('PersonalInfo', personalInfoSchema);

module.exports = PersonalInfo;
