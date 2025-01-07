import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import DietForm from './App';
import NutrientBreakdown from './diet';
import PersonalizedDietChart from './personalchart';
import PersonalizedChart from './personaldiet';
import PersonalizedDiet from'./personalform';
import UploadReports from './uploadreport';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <DietForm></DietForm>
  <NutrientBreakdown></NutrientBreakdown>
  <PersonalizedDiet></PersonalizedDiet>
  <PersonalizedDietChart></PersonalizedDietChart>
  <UploadReports></UploadReports>
  <PersonalizedChart></PersonalizedChart>
  </React.StrictMode>
);

