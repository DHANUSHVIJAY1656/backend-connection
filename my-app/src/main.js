import React, { useState } from 'react';
import PersonalInfoForm from './PersonalInfoForm Component';
import MealDistribution from './MealDistribution Component';
import LabResultsForm from './LabResultsForm Component';
import FinalReview from './FinalReview Component';

function App() {
  const [step, setStep] = useState(1);
  const [personalInfo, setPersonalInfo] = useState({});
  const [mealInfo, setMealInfo] = useState({});
  const [labResults, setLabResults] = useState({});

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  const handlePersonalInfoChange = (info) => setPersonalInfo(info);
  const handleMealInfoChange = (info) => setMealInfo(info);
  const handleLabResultsChange = (results) => setLabResults(results);

  return (
    <div className="container">
      {step === 1 && <PersonalInfoForm onSubmit={handlePersonalInfoChange} onNext={handleNextStep} />}
      {step === 2 && <MealDistribution onSubmit={handleMealInfoChange} onNext={handleNextStep} onPrev={handlePrevStep} />}
      {step === 3 && <LabResultsForm onSubmit={handleLabResultsChange} onNext={handleNextStep} onPrev={handlePrevStep} />}
      {step === 4 && <FinalReview personalInfo={personalInfo} mealInfo={mealInfo} labResults={labResults} />}
    </div>
  );
}

export default App;
