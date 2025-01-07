const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

// Create the Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017//user/dietform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a schema for the personalized diet form
const dietFormSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  mealsPerDay: String,
  mealsText: String,
  snacksPerDay: String,
  snacksText: String,
  majorityFoodConsumption: String,
  foodAllergies: String,
  allergiesText: String,
  dietaryRestrictions: String,
  restrictionsText: String,
  mealOrder: [String],
  dietGoals: [String],
  goalOtherText: String,
});

// Create a model for the diet form
const DietForm = mongoose.model('DietForm', dietFormSchema);

// POST endpoint for submitting the personalized diet form
app.post('/api/submit-diet-form', async (req, res) => {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    mealsPerDay,
    mealsText,
    snacksPerDay,
    snacksText,
    majorityFoodConsumption,
    foodAllergies,
    allergiesText,
    dietaryRestrictions,
    restrictionsText,
    mealOrder,
    dietGoals,
    goalOtherText,
  } = req.body;

  try {
    // Create a new diet form document
    const newDietForm = new DietForm({
      fullName,
      phoneNumber,
      emailAddress,
      mealsPerDay,
      mealsText,
      snacksPerDay,
      snacksText,
      majorityFoodConsumption,
      foodAllergies: foodAllergies === 'yes' ? 'Yes' : 'No',
      allergiesText: foodAllergies === 'yes' ? allergiesText : '',
      dietaryRestrictions: dietaryRestrictions === 'yes' ? 'Yes' : 'No',
      restrictionsText: dietaryRestrictions === 'yes' ? restrictionsText : '',
      mealOrder,
      dietGoals,
      goalOtherText: dietGoals.includes('Other') ? goalOtherText : '',
    });

    // Save the form data to the database
    await newDietForm.save();
    res.status(200).json({ message: 'Personalized diet form submitted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error submitting the diet form' });
  }
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:5000`);
});
