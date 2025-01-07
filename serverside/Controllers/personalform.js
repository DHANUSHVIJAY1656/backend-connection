const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =require('dotevn');

dotenv.config();

// Create the Express app
const app = express();
const PORT =process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017//user/personalform', {
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
  mealTimes: {
    breakfast: { time: String, ampm: String },
    lunch: { time: String, ampm: String },
    dinner: { time: String, ampm: String },
  },
});

// Create a model for the diet form
const DietForm = mongoose.model('DietForm', dietFormSchema);

// POST endpoint for submitting the personalized diet form
app.post('/personaldiet', async (req, res) => {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    mealsPerDay,
    mealsText,
    snacksPerDay,
    snacksText,
    breakfastTime,
    breakfastTimeAMPM,
    lunchTime,
    lunchTimeAMPM,
    dinnerTime,
    dinnerTimeAMPM,
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
      mealTimes: {
        breakfast: { time: breakfastTime, ampm: breakfastTimeAMPM },
        lunch: { time: lunchTime, ampm: lunchTimeAMPM },
        dinner: { time: dinnerTime, ampm: dinnerTimeAMPM },
      },
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

app.listen(PORT, () => {
  console.log(`Server is running on port`);
});
