const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require('path');
const fs = require('fs');
const dotenv = require("dotenv");
// const { DietFormController, getAllDiets } = require("./module/newcontroller");
// const { InfoController, getinfo } = require("./module/textform");
const { PersonalInfo, MealInfo, LabResults } = require("./models");
const uploadDirectory = 'uploads/';

const patientRoutes = require('./router/patientRoutes');
const nutrientRoutes = require("./router/nutrientRoutes");
const dietRoutes = require("./router/dietRoutes");
const dietChart = require('./router/dietChart');
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
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });

// app.get("/api/diet", getAllDiets);
// app.post("/api/diet", DietFormController);

// app.get("/api/info", getinfo);
// app.post("/api/info", InfoController);













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

app.post("/api/lab-results", async (req, res) => {
  try {
    const { hemoglobin, creatinine, potassium, phosphorus, ipth, vitaminD } =
      req.body;
    const newLabResults = new LabResults({
      hemoglobin,
      creatinine,
      potassium,
      phosphorus,
      ipth,
      vitaminD,
    });
    await newLabResults.save();
    res.status(200).json({ message: "Lab results saved successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error saving lab results", error: err });
  }
});

app.get("/api/uploaded-reports", (req, res) => {
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      return res.status(500).json({ message: "Error reading files", error: err });
    }
    
    // Map files to include full path to make them accessible
    const filePaths = files.map(file => path.join(uploadDirectory, file));

    res.status(200).json({ message: "Files retrieved successfully", files: filePaths });
  });
});

app.post("/api/upload-reports", upload.single("report"), (req, res) => {
  if (req.file) {
    res
      .status(200)
      .json({ message: "File uploaded successfully", filePath: req.file.path });
  } else {
    res.status(400).json({ message: "No file uploaded" });
  }
});


app.use('/api/patient', patientRoutes);
app.use("/api/nutrient", nutrientRoutes);
app.use("/api/diet", dietRoutes);
app.use("/api/diet-chart", dietChart);

app.use('/dietCharts', express.static(path.join(__dirname, 'dietCharts')));

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log("App running on 5000");
});
