const express = require("express");
const Patient = require("../Patient");
const router = express.Router();

// Endpoint to handle form submission and calculate BMI, ideal weight, etc.
router.post("/submit", async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      weight,
      heightCm,
      heightFeet,
      heightInches,
      dietType,
      activityLevel,
      kidneyDisease,
      comorbidities,
    } = req.body;

    let heightInMeters;
    if (heightCm) {
      heightInMeters = heightCm / 100;
    } else if (heightFeet && heightInches) {
      const totalInches = heightFeet * 12 + parseInt(heightInches);
      heightInMeters = totalInches * 0.0254;
    }

    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiCategory = getBmiCategory(bmi);
    const idealWeight = gender === "Male" ? heightCm - 100 : heightCm - 105;
    const adjustedWeight = calculateAdjustedWeight(bmi, idealWeight, weight);
    const weightDifference = weight - adjustedWeight;

    const newPatient = new Patient({
      name,
      age,
      gender,
      weight,
      heightCm,
      heightFeet,
      heightInches,
      dietType,
      activityLevel,
      kidneyDisease,
      comorbidities,
      idealWeight,
      adjustedWeight,
      bmi,
      bmiCategory,
      weightDifference,
    });

    await newPatient.save();

    res.status(200).json({
      message: "Data submitted successfully!",
      patientData: newPatient,
    });
  } catch (err) {
    res.status(500).json({ message: "Error saving patient data", error: err });
  }
});

// Function to get BMI category
const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal weight";
  if (bmi < 30) return "Overweight";
  return "Obese";
};

// Function to calculate adjusted weight based on BMI
const calculateAdjustedWeight = (bmi, idealWeight, actualWeight) => {
  if (bmi >= 18.5 && bmi <= 24.9) {
    return idealWeight;
  }
  return idealWeight + 0.25 * (actualWeight - idealWeight);
};

module.exports = router;
