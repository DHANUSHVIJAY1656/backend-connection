const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const DietFormController = require('./Controllers/Newcontroller');

const app = express();
const router = require('express').Router();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/user';


mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });

  router.post("/diet-form",DietFormController)

  app.use('/api', router);

// const dietList = [
//   { id: 1, name: 'Keto', description: 'Low-carb, high-fat diet' },
//   { id: 2, name: 'Vegan', description: 'Plant-based diet' }
// ];

// // GET /diet: Retrieve the diet list
// app.get('/diet', (req, res) => {
//   console.log('Diet Get');
//   res.json({ statusCode: 200, message: 'Diet List', data: dietList });
// });

// // POST /diet: Add a new diet to the list
// app.post('/diet', (req, res) => {
//   const { name, description } = req.body.name;

//   const newDiet = { id: Date.now(), name, description };
//   dietList.push(newDiet); 
//   console.log('New diet added:', newDiet);

//   res.status(201).json({ statusCode: 201, message: 'Diet added', data: newDiet });
// });



const dietList = [
  { id: 1, name: 'Keto', description: 'Low-carb, high-fat diet' },
  { id: 2, name: 'Vegan', description: 'Plant-based diet' }
];

// GET /diet: Retrieve the diet list
app.get('/diet', (req, res) => {
  console.log('Diet Get');
  res.json({ statusCode: 200, message: 'Diet List', data: dietList });
});

 
// POST /diet: Add a new diet to the list
app.post('/diet', (req, res) => {
  console.log(req.body)
  const { name, description } = req.body;
  const newDiet = { id: Date.now(), name, description };

  dietList.push(newDiet); // Add to the mock data
  console.log('New diet added:', newDiet);
  res.status(201).json({ statusCode: 201, message: 'Diet added', data: newDiet });
});



// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('App running on 5000');
});


