const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require('path');
const fs = require('fs');
const dotenv = require("dotenv");
const PDFDocument = require('pdfkit');
const KidneyDietForm = require('./module/Patient.js'); 
const{ PersonalInfo, MealInfo, LabResults } = require ('./models.js');
const LabResult = require('./module/LabResults');
const Nutrient = require("./module/Nutrient");
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



app.post('/api/kidney-diet', async (req, res) => {
  try {
    const formData = new KidneyDietForm(req.body);

    // Save the data to MongoDB
    await formData.save();

    // Respond with success message
    res.status(200).json({
      message: 'Form data submitted successfully!',
      data: formData,
    });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Error saving form data', error: error.message });
  }
});
app.get('/api/kidney-diet', async (req, res) => {
  try {
    const allForms = await KidneyDietForm.find(); // Fetch all records from MongoDB
    res.status(200).json({
      message: 'Form data fetched successfully!',
      data: allForms,
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ message: 'Error fetching form data', error: error.message });
  }
});

// POST: Save nutrient data
app.post("/api/nutrients", async (req, res) => {
  try {
    const nutrientData = new Nutrient(req.body);
    const savedData = await nutrientData.save();
    res.status(200).json({
      message: "Nutrient data saved successfully!",
      data: savedData,
    });
  } catch (error) {
    console.error("Error saving nutrient data:", error);
    res.status(400).json({
      message: "Error saving nutrient data.",
      error: error.message,
    });
  }
});

// GET: Retrieve nutrient data
app.get("/api/nutrients", async (req, res) => {
  try {
    const nutrients = await Nutrient.find();
    res.status(200).json({
      message: "Nutrient data fetched successfully!",
      data: nutrients,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching nutrient data.",
      error: error.message,
    });
  }
});


// GET route to fetch all personal information
app.get('/api/personal-info', async (req, res) => {
  try {
    // Fetch all personal info documents from the database
    const personalInfoList = await PersonalInfo.find();

    // Send the fetched data as the response
    res.status(200).json({
      message: 'Personal information fetched successfully!',
      data: personalInfoList,
    });
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.post('/api/personal-info', async (req, res) => {
  const { name, phone, email } = req.body;

  // Validate if the data is complete
  if (!name || !phone || !email) {
    return res.status(400).json({ message: 'All fields are required!' });
  }

  try {
    const personalInfo = new PersonalInfo({
      name,
      phone,
      email,
    });

    // Save the document to the database
    await personalInfo.save();

    return res.status(200).json({ message: 'Personal information saved successfully!' });
  } catch (error) {
    console.error('Error saving personal info:', error);  // Log the error
    return res.status(500).json({ message: 'Error saving data', error: error.message });
  }
});



app.get("/api/meal-info", async (req, res) => {
  try {
    const mealInfo = await mealInfo.find();
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

app.post('/api/lab-results', upload.array('reports', 10), async (req, res) => {
  try {
    const { hemoglobin, creatinine, potassium, phosphorus, ipth, vitaminD } = req.body;

    const filePaths = req.files.map(file => path.join('uploads', file.filename)); // File paths

    const labResult = new LabResult({
      hemoglobin,
      creatinine,
      potassium,
      phosphorus,
      ipth,
      vitaminD,
      filePaths,
    });

    const savedResult = await labResult.save();

    res.status(200).json({
      message: 'Lab results submitted successfully',
      data: savedResult,
    });
  } catch (error) {
    console.error('Error saving lab results:', error);
    res.status(500).json({
      message: 'Error saving lab results',
      error: error.message,
    });
  }
});

// GET Route to Fetch All Lab Results
app.get('/api/lab-results', async (req, res) => {
  try {
    const results = await LabResult.find();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching lab results:', error);
    res.status(500).json({ message: 'Error fetching lab results', error: error.message });
  }
});

// Serve Uploaded Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// GET route to fetch all lab results
app.get('/api/lab-results', async (req, res) => {
  try {
    const labResults = await LabResult.find();
    res.status(200).json({ message: 'Lab results fetched successfully', data: labResults });
  } catch (error) {
    console.error('Error fetching lab results:', error);
    res.status(500).json({ message: 'Failed to fetch lab results', error });
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
let storedData = {
  personalInfo: {
    name: '',
    phone: '',
    email: '',
  },
  mealOrder: [],
  labResults: {
    hemoglobin: '',
    creatinine: '',
    potassium: '',
    phosphorus: '',
    ipth: '',
    vitaminD: '',
  }
};

app.get('/api/final-submission', (req, res) => {
  // Simulate fetching data (e.g., from a database)
  res.status(200).json({
    message: 'Final data fetched successfully',
    data: storedData
  });
});

// POST method: Submit final data (e.g., save to database)
app.post('/api/final-submission', (req, res) => {
  const finalData = req.body;  // Received data from the frontend
  console.log('Received final data:', finalData);

  // Simulate saving the data (e.g., to a database)
  // You would save the data here, for example:
  // db.collection('finalSubmissions').insertOne(finalData, (err, result) => {
  //   if (err) {
  //     return res.status(500).send('Error saving data');
  //   }
  //   res.status(200).send('Final data submitted successfully');
  // });

  // For now, let's simulate a success response
  res.status(200).json({
    message: 'Final data received and processed successfully',
    data: finalData,
  });
});

// Example input data for diet
// const dietData = {
//   calories: 2500,
//   protein: 150,
//   dietType: 'Balanced'
// };

// Generate the PDF using the imported function
const pdfFilePath = generateDietChartPDF(LabResults);
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
  console.log("App running on " + PORT);
});
