// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function FinalReview({ personalInfo, mealOrder, labResults, onSubmit }) {
//   const [fetchedData, setFetchedData] = useState(null);

//   // Fetch the final data when the component mounts
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/final-submission');
//         setFetchedData(response.data.data);
//         console.log('Fetched data:', response.data);
//       } catch (error) {
//         console.error('Error fetching final data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSubmit = async () => {
//     const finalData = {
//       personalInfo,
//       mealOrder,
//       labResults,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/api/final-submission', finalData);
//       console.log('Final submission response:', response.data);
//       // Handle success (e.g., redirect or show success message)
//     } catch (error) {
//       console.error('Error submitting final data:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Review Your Information</h2>

//       {fetchedData && (
//         <div>
//           <h3>Personal Information</h3>
//           <p><strong>Name:</strong> {fetchedData.personalInfo.name}</p>
//           <p><strong>Phone:</strong> {fetchedData.personalInfo.phone}</p>
//           <p><strong>Email:</strong> {fetchedData.personalInfo.email}</p>

//           <h3>Meal Distribution</h3>
//           <p><strong>Meal Order:</strong> {fetchedData.mealOrder.join(', ')}</p>

//           <h3>Lab Results</h3>
//           <p><strong>Hemoglobin:</strong> {fetchedData.labResults.hemoglobin}</p>
//           <p><strong>Serum Creatinine:</strong> {fetchedData.labResults.creatinine}</p>
//           <p><strong>Potassium:</strong> {fetchedData.labResults.potassium}</p>
//           <p><strong>Phosphorus:</strong> {fetchedData.labResults.phosphorus}</p>
//           <p><strong>iPTH:</strong> {fetchedData.labResults.ipth}</p>
//           <p><strong>Vitamin D:</strong> {fetchedData.labResults.vitaminD}</p>

//           <button onClick={handleSubmit}>Submit</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default FinalReview;























import React from 'react';

function FinalReview({ personalInfo, mealInfo, labResults, onSubmit, onPrev }) {
  const handleFinalSubmit = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/final-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ personalInfo, mealInfo, labResults }),
      });

      if (response.ok) {
        alert('All details submitted successfully!');
      } else {
        alert('Failed to submit details. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting final review:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h2>Review Your Information</h2>

      {/* Personal Information */}
      <h3>Personal Information</h3>
      <p><strong>Name:</strong> {personalInfo.name}</p>
      <p><strong>Phone:</strong> {personalInfo.phone}</p>
      <p><strong>Email:</strong> {personalInfo.email}</p>

      {/* Meal Distribution */}
      <h3>Meal Distribution</h3>
      <ul>
        {mealInfo.mealOrder.map((meal, index) => (
          <li key={index}>{meal}</li>
        ))}
      </ul>

      {/* Lab Results */}
      <h3>Lab Results</h3>
      <p><strong>Hemoglobin:</strong> {labResults.hemoglobin}</p>
      <p><strong>Serum Creatinine:</strong> {labResults.creatinine}</p>
      <p><strong>Potassium:</strong> {labResults.potassium}</p>
      <p><strong>Phosphorus:</strong> {labResults.phosphorus}</p>
      <p><strong>iPTH:</strong> {labResults.ipth}</p>
      <p><strong>25-OH Vitamin D:</strong> {labResults.vitaminD}</p>

      <div style={{ marginTop: '20px' }}>
        <button onClick={onPrev}>Back</button>
        <button onClick={handleFinalSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default FinalReview;
