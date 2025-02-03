// import React, { useState } from 'react';
// import PersonalInfoForm from './PersonalInfoForm Component';
// import MealDistribution from './MealDistribution Component';
// import LabResultsForm from './LabResultsForm Component';
// import FinalReview from './FinalReview Component';

// function MultiStepForm() {
//   const [personalInfo, setPersonalInfo] = useState({});
//   const [mealOrder, setMealOrder] = useState([]);
//   const [labResults, setLabResults] = useState({});
//   const [step, setStep] = useState(1);

//   const handlePersonalInfoSubmit = (data) => {
//     setPersonalInfo(data);
//     setStep(2);  // Move to next step
//   };

//   const handleMealOrderSubmit = (data) => {
//     setMealOrder(data.mealOrder);
//     setStep(3);  // Move to next step
//   };

//   const handleLabResultsSubmit = (data) => {
//     setLabResults(data.labResults);
//     setStep(4);  // Move to Final Review
//   };

//   const handleFinalSubmit = (data) => {
//     // Final submission logic
//     console.log('Final data:', data);
//   };

//   return (
//     <div>
//       {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoSubmit} onNext={() => setStep(2)} />}
//       {step === 2 && <MealDistribution onSubmit={handleMealOrderSubmit} onNext={() => setStep(3)} onPrev={() => setStep(1)} />}
//       {step === 3 && <LabResultsForm onSubmit={handleLabResultsSubmit} onNext={() => setStep(4)} onPrev={() => setStep(2)} />}
//       {step === 4 && <FinalReview personalInfo={personalInfo} mealOrder={mealOrder} labResults={labResults} onSubmit={handleFinalSubmit} />}
//     </div>
//   );
// }

// export default MultiStepForm;






















import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm Component';
import MealDistribution from './MealDistribution Component';
import LabResultsForm from './LabResultsForm Component';
import FinalReview from './FinalReview Component';

function MultiStepForm() {
  const [personalInfo, setPersonalInfo] = useState({});
  const [mealOrder, setMealOrder] = useState([]);
  const [labResults, setLabResults] = useState({});
  const [step, setStep] = useState(1);

  const handleFinalSubmit = async () => {
    const finalData = {
      personalInfo,
      mealOrder,
      labResults,
    };

    try {
      const response = await fetch('http://localhost:5000/api/final-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      });

      if (response.ok) {
        alert('Details submitted successfully!');
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      {step === 1 && (
        <PersonalInfoForm
          onSubmit={(data) => {
            setPersonalInfo(data);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <MealDistribution
          onSubmit={(data) => {
            setMealOrder(data.mealOrder);
            setStep(3);
          }}
          onPrev={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <LabResultsForm
          onSubmit={(data) => {
            setLabResults(data);
            setStep(4);
          }}
          onPrev={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <FinalReview
          personalInfo={personalInfo}
          mealOrder={mealOrder}
          labResults={labResults}
          onPrev={() => setStep(3)}
          onSubmit={handleFinalSubmit}
        />
      )}
    </div>
  );
}

export default MultiStepForm;
