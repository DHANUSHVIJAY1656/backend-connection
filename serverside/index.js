const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { DietFormController, getAllDiets } = require('./module/newcontroller');
const {PersonalController, getPersonal } = require('./module/personalform');
const { InfoController, getinfo } = require('./module/textform')
const {deitinfoController,getdietinfo} = require('./module/dietinfo');
const {LabrepoController, getrepo} = require('./module/report');
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


  app.get('/api/diet', getAllDiets);
  app.post('/api/diet', DietFormController);

  app.get('/api/personal',getPersonal);
  app.post('/api/personal',PersonalController);
   
  app.get('/api/info',getinfo);
  app.post('/api/info',InfoController);
 
  app.get('/api/deitinfo',getdietinfo);
  app.post('/api/deitinfo',deitinfoController);
 
  app.get('/api/report',getrepo);
  app.post('/api/report',LabrepoController);



// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log('App running on 5000');
});


