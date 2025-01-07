// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  mongoose.connect('mongodb://localhost:27017//user/post', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
// Mongoose Schema
const dietFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ['male', 'female', 'others'] },
  weight: { type: Number, required: true },
  heightCm: { type: Number, required: function () { return this.heightUnit === 'cm'; } },
  heightFt: { type: Number, required: function () { return this.heightUnit === 'ftin'; } },
  heightIn: { type: Number, required: function () { return this.heightUnit === 'ftin'; } },
  heightUnit: { type: String, required: true, enum: ['cm', 'ftin'] },
  dietType: { type: String, required: true, enum: ['vegetarian', 'non-vegetarian'] },
  dietSubType: { type: String },
  activityLevel: {
    type: String,
    required: true,
    enum: ['sedentary', 'mildly-active', 'moderately-active', 'very-active'],
  },
  hasKidneyDisease: { type: Boolean, required: true },
  kidneyCondition: { type: String },
  hasDiabetes: { type: Boolean, required: true },
  hasHypertension: { type: Boolean, required: true },
  hasGout: { type: Boolean, required: true },
  hasCardiovascularDisease: { type: Boolean, required: true },
  hasOtherComorbidity: { type: Boolean, required: true },
  otherComorbidityDetails: { type: String },
});

// Mongoose Model
const DietForm = mongoose.model('post', dietFormSchema);
// API Routes
app.post('/diet', async (req, res) => {
  try {
    const formData = new DietForm(req.body);
    const savedData = await formData.save();
    res.status(201).json({
      message: 'Form submitted successfully',
      data: savedData,
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({
      message: 'Error submitting form',
      error: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port `);
});
