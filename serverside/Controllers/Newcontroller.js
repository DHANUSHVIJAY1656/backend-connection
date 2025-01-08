const mongoose = require('mongoose');

// Mongoose Schema
const FormData = new mongoose.Schema({
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
const DietForm = mongoose.model('DeitForm', FormData);
// API Routes
const DietFormController = async (req, res) => {
  try {
    const formData = new DietForm(req.body);
    console.log(req.body)
    const savedData = await formData.save();
    res.status(200).json({
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
};



module.exports = DietFormController