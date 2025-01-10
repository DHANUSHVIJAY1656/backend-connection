import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import DietForm from './App';
import NutrientBreakdown from './diet';
import PersonalizedChart from './personaldiet';
import UploadReports from './uploadreport';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DietForm></DietForm>
  <NutrientBreakdown></NutrientBreakdown>
  <UploadReports></UploadReports>
  <PersonalizedChart></PersonalizedChart>
 
  </React.StrictMode>
);

