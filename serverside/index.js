

const express = require('express');
console.log(1);
const mongoose = require('mongoose');
console.log(2);
const cors = require('cors');
console.log(3);

const app = express();
console.log(4);
const personalform = express();
console.log(5);
const personalchart = express();
console.log(6);
const personaldiet = express();
console.log(7);
const uploadreport = express();
console.log(8);

// MIDDLEWARES
app.use(cors());
console.log(9);
app.use(express.json());
console.log(10);

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/user';
console.log(11);

mongoose
  .connect(mongoURI) 
  .then(() => {
    console.log(12);
    console.log('Connected to MongoDB successfully!');
    console.log(13);
  })
  .catch((err) => {
    console.log(14);
    console.error('Failed to connect to MongoDB:', err);
    console.log(15);
  });


// Routes
app.get('/diet', (req, res) => {
  console.log('Diet Get');
  res.json({ statusCode: 0, message: 'Diet List' });
});

app.post('/diet', (req, res) => {
  console.log(req.body);
});

personalform.get('/dietpersonal', (req, res) => {
  console.log('Personal Form');
  res.json({ statusCode: 0, message: 'Diet List' });
});

personalform.post('/dietpersonal', (req, res) => {
  console.log(req.body);
});

personalchart.get('/dietchat', (req, res) => {
  console.log('Personal Chart');
  res.json({ statusCode: 0, message: 'Diet List' });
});

personalchart.post('/dietchat', (req, res) => {
  console.log(req.body);
});

personaldiet.get('/personaldiet', (req, res) => {
  console.log('personal diet');
  res.json({ statusCode: 0, message: 'Diet List' });
});

personaldiet.post('/personaldiet', (req, res) => {
  console.log(req.body);
});

uploadreport.get('/dietupload', (req, res) => {
  console.log('Upload report');
  res.json({ statusCode: 0, message: 'Diet List' });
});

uploadreport.post('/dietupload', (req, res) => {
  console.log(req.body);
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('App running on 5000');
});
