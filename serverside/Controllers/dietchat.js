const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
// Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;


// Set up body parser to handle JSON and URL encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017//user/dietChart', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for the personalized diet form
const dietFormSchema = new mongoose.Schema({
  fullName: String,
  phoneNumber: String,
  emailAddress: String,
  mealsPerDay: String,
  snacksPerDay: String,
  majorityFoodConsumption: String,
  foodAllergies: String,
  allergiesDetails: String,
  dietaryRestrictions: String,
  restrictionsDetails: String,
  mealDistribution: [String], // Array to store meal and snack order
});

// Create a model for the diet form
const DietForm = mongoose.model('DietForm', dietFormSchema);

// POST endpoint for submitting the personalized diet form
app.post('/dietchat', async (req, res) => {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    mealsPerDay,
    snacksPerDay,
    majorityFoodConsumption,
    foodAllergies,
    allergiesDetails,
    dietaryRestrictions,
    restrictionsDetails,
    mealDistribution,
  } = req.body;

  try {
    // Create a new diet form document
    const newDietForm = new DietForm({
      fullName,
      phoneNumber,
      emailAddress,
      mealsPerDay,
      snacksPerDay,
      majorityFoodConsumption,
      foodAllergies: foodAllergies === "Yes" ? "Yes" : "No",
      allergiesDetails: foodAllergies === "Yes" ? allergiesDetails : "",
      dietaryRestrictions: dietaryRestrictions === "Yes" ? "Yes" : "No",
      restrictionsDetails: dietaryRestrictions === "Yes" ? restrictionsDetails : "",
      mealDistribution: mealDistribution, // Storing meal/snack order
    });

    // Save the form data to the database
    await newDietForm.save();
    res.status(200).json({ message: 'Personalized diet form submitted successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting the diet form' });
  }
});

// Server listening
app.listen(prompt, () => {
  console.log('Server is running on port');
});
