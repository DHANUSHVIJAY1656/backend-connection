// import React from 'react';
// import axios from 'axios';
// function FinalReview({ personalInfo, mealInfo, labResults }) {
//   const handleSubmit = async () => {
//     const data = {
//       personalInfo,
//       mealInfo,
//       labResults,
//     };

//     try {
 
//       const response = await axios.post('http://localhost:5000/api/lab-results', data);
//       console.log('Response from backend:', response.data);
//       alert('Your personalized diet chart is generated!');
//     } catch (error) {
     
//       console.error('Error generating diet plan:', error);
//       alert('Failed to generate diet plan. Please try again.');
//     }
//   };
//   return (
//     <div>
//       <h2>Review Your Information</h2>
//       <h3>Personal Info</h3>
//       <p>Name: {personalInfo.name}</p>
//       <p>Phone: {personalInfo.phone}</p>
//       <p>Email: {personalInfo.email}</p>

//       <h3>Meal Distribution</h3>
//       <p>Meal Order: {mealInfo.mealOrder.join(', ')}</p>

//       <h3>Lab Results</h3>
//       <p>Hemoglobin: {labResults.hemoglobin}</p>
//       <p>Serum Creatinine: {labResults.creatinine}</p>
//       <p>Potassium: {labResults.potassium}</p>
//       <p>Phosphorus: {labResults.phosphorus}</p>
//       <p>iPTH: {labResults.ipth}</p>
//       <p>Vitamin D: {labResults.vitaminD}</p>

//       <button onClick={handleSubmit}>Generate Diet Plan</button>
//     </div>
//   );
// }

// export default FinalReview;







import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FinalReview({ personalInfo, mealInfo, labResults }) {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    if (personalInfo && mealInfo && labResults) {
      console.log('Data loaded:', { personalInfo, mealInfo, labResults });
      setIsDataLoaded(true);
    } else {
      console.log('Waiting for data...', { personalInfo, mealInfo, labResults });
    }
  }, [personalInfo, mealInfo, labResults]);

  const handleSubmit = async () => {
    const data = {
      personalInfo,
      mealInfo,
      labResults,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/final', data);
      console.log('Response from backend:', response.data);
      alert('Your personalized diet chart is generated!');
    } catch (error) {
      console.error('Error generating diet plan:', error);
      alert('Failed to generate diet plan. Please try again.');
    }
  };

  // If data is not loaded, display a loading message
  if (!isDataLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Review Your Information</h2>

      {/* Personal Info */}
      <h3>Personal Info</h3>
      <p>Name: {personalInfo?.name || 'N/A'}</p>
      <p>Phone: {personalInfo?.phone || 'N/A'}</p>
      <p>Email: {personalInfo?.email || 'N/A'}</p>

      {/* Meal Distribution */}
      <h3>Meal Distribution</h3>
      <p>Meal Order: {mealInfo?.mealOrder?.join(', ') || 'N/A'}</p>

      {/* Lab Results */}
      <h3>Lab Results</h3>
      <p>Hemoglobin: {labResults?.hemoglobin || 'N/A'}</p>
      <p>Serum Creatinine: {labResults?.creatinine || 'N/A'}</p>
      <p>Potassium: {labResults?.potassium || 'N/A'}</p>
      <p>Phosphorus: {labResults?.phosphorus || 'N/A'}</p>
      <p>iPTH: {labResults?.ipth || 'N/A'}</p>
      <p>Vitamin D: {labResults?.vitaminD || 'N/A'}</p>

      <button onClick={handleSubmit}>Generate Diet Plan</button>
    </div>
  );
}

export default FinalReview;
