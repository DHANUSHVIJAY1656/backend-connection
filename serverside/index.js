

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();
const personalform = express();
const personalchart = express();
const personaldiet = express();
const uploadreport = express();


// MIDDLEWARES
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/user';


mongoose
  .connect(mongoURI) 
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })

  .catch((err) => { 
   console.error('Failed to connect to MongoDB:', err);
  });


// Routes
app.get('/diet', (req, res) => {
  console.log('Diet Get');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/diet', (req, res) => {
  console.log(req.body);
});

app.get('/dietpersonal', (req, res) => {
  console.log('Personal Form');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/dietpersonal', (req, res) => {
  console.log(req.body);
});

app.get('/dietchat', (req, res) => {
  console.log('Personal Chart');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/dietchat', (req, res) => {
  console.log(req.body);
});

app.get('/personaldiet', (req, res) => {
  console.log('personal diet');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/personaldiet', (req, res) => {
  console.log(req.body);
});

app.get('/dietupload', (req, res) => {
  console.log('Upload report');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/dietupload', (req, res) => {
  console.log(req.body);
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('App running on 5000');
});
