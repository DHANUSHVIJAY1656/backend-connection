const express = require("express");
const Nutrient = require("../Nutrient");
const router = express.Router();

// Route to submit nutrient data
router.post("/submit", async (req, res) => {
  try {
    const { calories, protein, fat, carbs } = req.body;

    // Create a new Nutrient entry
    const newNutrient = new Nutrient({
      calories,
      protein,
      fat,
      carbs,
    });

    // Save the new nutrient data to the database
    await newNutrient.save();

    // Send response
    res.status(200).json({
      message: "Nutrient data saved successfully",
      nutrientData: newNutrient,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving nutrient data", error: err });
  }
});

module.exports = router;
