const express = require('express');
const LabResults = require('../module/LabResults');

const router = express.Router();

router.post('/api/labresult', async (req, res) => {
  const { personalInfo, mealInfo, labResults } = req.body;

  // Check if all necessary data is provided
  if (!personalInfo || !mealInfo || !labResults) {
    return res.status(400).json({ message: 'Missing required data.' });
  }

  try {
    // Save the lab results into the database
    const newLabResults = new LabResults({
      personalInfo,
      mealInfo,
      labResults,
    });

    await newLabResults.save();
    res.status(200).json({ message: 'Diet plan generated successfully!' });
  } catch (error) {
    console.error('Error saving lab results:', error);
    res.status(500).json({ message: 'Error saving lab results.' });
  }
});

module.exports = router;
