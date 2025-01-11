import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import Diet from './App';
// import NutrientBreakdown from './diet';
// import PersonalizedChart from './personaldiet';
// import UploadReports from './uploadreport';
import App from './main';
import KidneyDietForm from './kidneydietform';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <KidneyDietForm></KidneyDietForm>
    <Diet/>
  <DndProvider backend={HTML5Backend}>
    <App />
  </DndProvider>
  
 
  </React.StrictMode>
);

