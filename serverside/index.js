const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const dotenv = require("dotenv");
const PDFDocument = require('pdfkit');
const { PersonalInfo, MealInfo, LabResults } = require("./models");
const uploadDirectory = 'uploads/';
const Diet = require('./external/diet'); 
const generateDietChartPDF = require('./external/dietChartGenerator');
const { CalculateTotalCalories, calculateProtein } = require('./external/utill');

// const patientRoutes = require('./router/patientRoutes');
// const nutrientRoutes = require("./router/nutrientRoutes");
// const dietRoutes = require("./router/dietRoutes");
// const dietChart = require('./router/dietChart');
const app = express();
const router = require("express").Router();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = "mongodb://localhost:27017/user";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

// File upload configuration
const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit



app.post('/api/diet', async (req, res) => {
  try {
    const { calories, name, age, weight, heightCm } = req.body;

    if (!calories , name , age , weight , heightCm )
      {
      // Default calorie value if missing
      req.body.FormData= 2000; // Set a default value
    }

    const newDiet = new Diet(req.body);
    await newDiet.save();
    res.status(201).json({ message: "Diet details saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error.message);
    res.status(500).json({ error: error.message });
  }
});



app.post("/api/diet", async (req, res) => {
  try {
    const formData = new FormData(req.body);
    await formData.save();
    res.status(201).json({ message: "Form data saved successfully!" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/nutrients", async (req, res) => {
  const { weight, height, age, gender, results } = req.body;

  try {
    const nutrientData = new Nutrient({
      calories: results.calories,
      protein: results.protein,
      fat: results.fat,
      carbs: results.carbs,
      createdAt: new Date(),
    });

    await nutrientData.save();
    res.status(201).json({ message: "Nutrient data saved successfully", nutrientData });
  } catch (error) {
    res.status(500).json({ message: "Failed to save nutrient data", error });
  }
});

// Endpoint to get all saved nutrients (optional)
app.get("/api/nutrients", async (req, res) => {
  try {
    const nutrients = await Nutrient.find();
    res.json(nutrients);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve nutrient data", error });
  }
});

app.get("/api/personal-info", async (req, res) => {
  try {
    const personalInfo = await PersonalInfo.find();
    if (!personalInfo) {
      return res
        .status(404)
        .json({ message: "Personal information not found" });
    }
    res.status(200).json(personalInfo);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching personal info", error: err });
  }
});

app.post("/api/personal-info", async (req, res) => {
  try {
    const { name, phone, email } = req.body;
    const newPersonalInfo = new PersonalInfo({ name, phone, email });
    await newPersonalInfo.save();
    res.status(200).json({ message: "Personal Info saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving personal info", error: err });
  }
});

app.get("/api/meal-info", async (req, res) => {
  try {
    const mealInfo = await MealInfo.find();
    if (!mealInfo) {
      return res.status(404).json({ message: "Meal information not found" });
    }
    res.status(200).json(mealInfo);
  } catch (err) {
    res.status(500).json({ message: "Error fetching meal info", error: err });
  }
});

app.post("/api/meal-info", async (req, res) => {
  try {
    const { mealOrder } = req.body;
    const newMealInfo = new MealInfo({ mealOrder });
    await newMealInfo.save();
    res.status(200).json({ message: "Meal info saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving meal info", error: err });
  }
});

app.get("/api/lab-results", async (req, res) => {
  try {
    const labResults = await LabResults.find();
    if (!labResults) {
      return res.status(404).json({ message: "Lab results not found" });
    }
    res.status(200).json(labResults);
  } catch (err) {
    res.status(500).json({ message: "Error fetching lab results", error: err });
  }
});

({
  dest: 'uploads/', 
  limits: { fileSize: 10 * 1024 * 1024 }, 
});

app.post('/api/lab-results', upload.array('reports'), (req, res) => {
  try {
    console.log('Received form data:', req.body);
    console.log('Files uploaded:', req.files);
    // Process the form data and files here (e.g., save to DB)
    res.status(200).send({ message: 'Lab results uploaded successfully' });
  } catch (error) {
    console.error('Error processing lab results:', error);
    res.status(500).send({ message: 'Error saving lab results', error: error.message });
  }
});

app.get('/api/labresult', async (req, res) => {
  try {
    // Retrieve the latest saved personal info, meal info, and lab results
    const personalInfo = await PersonalInfo.find({});
    const mealInfo = await MealInfo.find({});
    const labResults = await LabResults.find({});

    // Check if the data is found
    if (!personalInfo.length || !mealInfo.length || !labResults.length) {
      return res.status(404).json({ error: 'No data found' });
    }

    // Combine all the retrieved data into one response object
    const responseData = {
      personalInfo: personalInfo[0], // Assuming we only have one entry
      mealInfo: mealInfo[0],         // Assuming we only have one entry
      labResults: labResults[0],     // Assuming we only have one entry
    };

    // Return the response with the data
    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Failed to retrieve data. Please try again.' });
  }
});

app.post('/api/labresult', async (req, res) => {
  try {
    const { personalInfo, mealInfo, labResults } = req.body;

    // Validate the incoming data
    if (!personalInfo || !mealInfo || !labResults) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!personalInfo.name || !personalInfo.phone || !personalInfo.email) {
      return res.status(400).json({ error: 'Personal information is incomplete.' });
    }

    if (!mealInfo.mealOrder || !Array.isArray(mealInfo.mealOrder)) {
      return res.status(400).json({ error: 'Meal information is invalid.' });
    }

    if (!labResults.hemoglobin || !labResults.creatinine || !labResults.potassium || !labResults.phosphorus || !labResults.ipth || !labResults.vitaminD) {
      return res.status(400).json({ error: 'Lab results are incomplete.' });
    }

    // Proceed with saving to DB
    const newPersonalInfo = new PersonalInfo(personalInfo);
    const newMealInfo = new MealInfo(mealInfo);
    const newLabResults = new LabResults(labResults);

    await newPersonalInfo.save();
    await newMealInfo.save();
    await newLabResults.save();

    res.status(200).json({ message: 'Diet Plan Generated Based on Lab Results and Meal Distribution' });
  } catch (error) {
    console.error('Error processing the request:', error);
    res.status(500).json({ error: 'Failed to generate diet plan. Please try again.' });
  }
});

app.post('/api/final', (req, res) => {
  const { personalInfo, mealInfo, labResults } = req.body;
  console.log('Received data:', { personalInfo, mealInfo, labResults });

  // Process the data (e.g., generate diet chart)
  res.status(200).send({ message: 'Diet chart generated successfully!' });
});





// Example input data for diet
const dietData = {
  calories: 2500,
  protein: 150,
  dietType: 'Balanced'
};

// Generate the PDF using the imported function
const pdfFilePath = generateDietChartPDF(dietData);
const uploadDir = path.join(__dirname, 'uploads');

// Check if the 'uploads' directory exists, if not create it
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Log the result (PDF file path)
console.log(`Diet chart PDF generated at: ${pdfFilePath}`);

const abw = " "; 
const activityLevel = '';
const kidneyCondition = '';

const totalCalories = CalculateTotalCalories(abw, activityLevel);
const proteinIntake = calculateProtein(kidneyCondition, abw);

console.log(`Total Calories: ${totalCalories}`);
console.log(`Protein Intake: ${proteinIntake}`);

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("App running on 5000");
});
