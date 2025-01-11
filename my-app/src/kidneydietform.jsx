import React, { useState } from 'react';

const KidneyDietForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    heightCm: '',
    heightFeet: '',
    heightInches: '',
    dietType: '',
    activityLevel: '',
    kidneyDisease: '',
    comorbidities: [],
    idealWeight: null,
    adjustedWeight: null,
    bmi: null,
    weightDifference: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { weight, heightCm, heightFeet, heightInches, gender } = formData;
    
    let heightInMeters;
    if (heightCm) {
      heightInMeters = heightCm / 100;
    } else if (heightFeet && heightInches) {
      const totalInches = (heightFeet * 12) + parseInt(heightInches);
      heightInMeters = totalInches * 0.0254;
    }
  
    const bmi = weight / (heightInMeters * heightInMeters);
    const bmiCategory = getBmiCategory(bmi);
    const idealWeight = gender === 'Male' ? heightCm - 100 : heightCm - 105;
    const adjustedWeight = calculateAdjustedWeight(bmi, idealWeight, weight);
    const weightDifference = weight - adjustedWeight;
  
    setFormData({
      ...formData,
      bmi,
      bmiCategory,
      idealWeight,
      adjustedWeight,
      weightDifference,
    });
  
    // Send form data to the backend
    const response = await fetch('http://localhost:5000/api/patient', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();
    if (response.ok) {
      console.log('Data saved successfully:', result.patientData);
    } else {
      console.error('Error saving data:', result.error);
    }
  };
  
  const getBmiCategory = (bmi) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  const calculateAdjustedWeight = (bmi, idealWeight, actualWeight) => {
    if (bmi >= 18.5 && bmi <= 24.9) {
      return idealWeight;
    }
    return idealWeight + 0.25 * (actualWeight - idealWeight);
  };

  return (
    <div className="container">
      <h2>Your Personalized Kidney-Friendly Diet Plan</h2>
      <form onSubmit={handleSubmit}>
        <section>
          <h3>Personal Information</h3>
          <lable>
            Name:
            </lable>
          <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={formData.name} 
            onChange={handleInputChange} 
          />
          <br></br>
          <label>
            Age:
            </label>
          <input 
            type="number" 
            name="age" 
            placeholder="Age" 
            value={formData.age} 
            onChange={handleInputChange} 
            min="18" 
            max="100" 
          />
          
          <div>
            <label>Gender:</label>
            <input 
              type="radio" 
              name="gender" 
              value="Male" 
              checked={formData.gender === 'Male'} 
              onChange={handleInputChange} 
            /> Male
            <input 
              type="radio" 
              name="gender" 
              value="Female" 
              checked={formData.gender === 'Female'} 
              onChange={handleInputChange} 
            /> Female
          </div>
          <label>Weight (kg):</label>
          <input 
            type="number" 
            name="weight" 
            placeholder="Weight (kg)" 
            value={formData.weight} 
            onChange={handleInputChange} 
          />
          <div>
            <label>Height:</label>
            <input 
              type="number" 
              name="heightCm" 
              placeholder="Height (cm)" 
              value={formData.heightCm} 
              onChange={handleInputChange} 
            />
            <span>or</span>
            <input 
              type="number" 
              name="heightFeet" 
              placeholder="Feet" 
              value={formData.heightFeet} 
              onChange={handleInputChange} 
            />
            <input 
              type="number" 
              name="heightInches" 
              placeholder="Inches" 
              value={formData.heightInches} 
              onChange={handleInputChange} 
            />
          </div>
        </section>

        <section>
          <h3>Diet Type</h3>
          <select 
            name="dietType" 
            value={formData.dietType} 
            onChange={handleInputChange}
          >
            <option value="">Select Diet Type</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </section>

        <section>
          <h3>Activity Level</h3>
          <div>
            <input 
              type="radio" 
              name="activityLevel" 
              value="Sedentary" 
              checked={formData.activityLevel === 'Sedentary'} 
              onChange={handleInputChange} 
            /> Sedentary
            <input 
              type="radio" 
              name="activityLevel" 
              value="Mildly Active" 
              checked={formData.activityLevel === 'Mildly Active'} 
              onChange={handleInputChange} 
            /> Mildly Active
            <input 
              type="radio" 
              name="activityLevel" 
              value="Moderately Active" 
              checked={formData.activityLevel === 'Moderately Active'} 
              onChange={handleInputChange} 
            /> Moderately Active
            <input 
              type="radio" 
              name="activityLevel" 
              value="Very Active" 
              checked={formData.activityLevel === 'Very Active'} 
              onChange={handleInputChange} 
            /> Very Active
          </div>
        </section>

        <section>
          <h3>Kidney Disease and Comorbidities</h3>
          <div>
            <label>Do you have kidney disease?</label>
            <input 
              type="radio" 
              name="kidneyDisease" 
              value="Yes" 
              checked={formData.kidneyDisease === 'Yes'} 
              onChange={handleInputChange} 
            /> Yes
            <input 
              type="radio" 
              name="kidneyDisease" 
              value="No" 
              checked={formData.kidneyDisease === 'No'} 
              onChange={handleInputChange} 
            /> No
          </div>
          <div>
            <label>Comorbidities:</label>
            <input 
              type="checkbox" 
              name="comorbidities" 
              value="Diabetes" 
              checked={formData.comorbidities.includes('Diabetes')} 
              onChange={(e) => {
                const newComorbidities = e.target.checked
                  ? [...formData.comorbidities, 'Diabetes']
                  : formData.comorbidities.filter((item) => item !== 'Diabetes');
                setFormData({ ...formData, comorbidities: newComorbidities });
              }} 
            /> Diabetes
            <input 
              type="checkbox" 
              name="comorbidities" 
              value="Hypertension" 
              checked={formData.comorbidities.includes('Hypertension')} 
              onChange={(e) => {
                const newComorbidities = e.target.checked
                  ? [...formData.comorbidities, 'Hypertension']
                  : formData.comorbidities.filter((item) => item !== 'Hypertension');
                setFormData({ ...formData, comorbidities: newComorbidities });
              }} 
            /> Hypertension
            {/* Additional checkboxes for other comorbidities */}
          </div>
        </section>

        <button type="submit">Submit My Details</button>
      </form>

      {formData.bmi && (
        <div>
          <h3>Results</h3>
          <p>Your BMI is {formData.bmi.toFixed(1)}, which is considered {formData.bmiCategory}.</p>
          <p>Your Ideal Body Weight (IBW) is {formData.idealWeight} kg.</p>
          <p>Your adjusted target weight is {formData.adjustedWeight.toFixed(1)} kg.</p>
          <p>
            You are {formData.weightDifference.toFixed(1)} kg {formData.weightDifference > 0 ? 'above' : 'below'} your adjusted target weight.
          </p>
        </div>
      )}
    </div>
  );
};

export default KidneyDietForm;
