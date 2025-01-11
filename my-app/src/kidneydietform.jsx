// import React, { useState } from 'react';

// const KidneyDietForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     age: '',
//     gender: '',
//     weight: '',
//     heightCm: '',
//     heightFeet: '',
//     heightInches: '',
//     dietType: '',
//     activityLevel: '',
//     kidneyDisease: '',
//     comorbidities: [],
//     idealWeight: null,
//     adjustedWeight: null,
//     bmi: null,
//     weightDifference: null,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     const { weight, heightCm, heightFeet, heightInches, gender } = formData;
    
//     let heightInMeters;
//     if (heightCm) {
//       heightInMeters = heightCm / 100;
//     } else if (heightFeet && heightInches) {
//       const totalInches = (heightFeet * 12) + parseInt(heightInches);
//       heightInMeters = totalInches * 0.0254;
//     }
  
//     const bmi = weight / (heightInMeters * heightInMeters);
//     const bmiCategory = getBmiCategory(bmi);
//     const idealWeight = gender === 'Male' ? heightCm - 100 : heightCm - 105;
//     const adjustedWeight = calculateAdjustedWeight(bmi, idealWeight, weight);
//     const weightDifference = weight - adjustedWeight;
  
//     setFormData({
//       ...formData,
//       bmi,
//       bmiCategory,
//       idealWeight,
//       adjustedWeight,
//       weightDifference,
//     });
  
//     // Send form data to the backend
//     const response = await fetch('http://localhost:5000/api/patient', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     });
  
//     const result = await response.json();
//     if (response.ok) {
//       console.log('Data saved successfully:', result.patientData);
//     } else {
//       console.error('Error saving data:', result.error);
//     }
//   };
  
//   const getBmiCategory = (bmi) => {
//     if (bmi < 18.5) return 'Underweight';
//     if (bmi < 25) return 'Normal weight';
//     if (bmi < 30) return 'Overweight';
//     return 'Obese';
//   };

//   const calculateAdjustedWeight = (bmi, idealWeight, actualWeight) => {
//     if (bmi >= 18.5 && bmi <= 24.9) {
//       return idealWeight;
//     }
//     return idealWeight + 0.25 * (actualWeight - idealWeight);
//   };

//   return (
//     <div className="container">
//       <h2>Your Personalized Kidney-Friendly Diet Plan</h2>
//       <form onSubmit={handleSubmit}>
//         <section>
//           <h3>Personal Information</h3>
//           <lable>
//             Name:
//             </lable>
//           <input 
//             type="text" 
//             name="name" 
//             placeholder="Name" 
//             value={formData.name} 
//             onChange={handleInputChange} 
//           />
//           <br></br>
//           <label>
//             Age:
//             </label>
//           <input 
//             type="number" 
//             name="age" 
//             placeholder="Age" 
//             value={formData.age} 
//             onChange={handleInputChange} 
//             min="18" 
//             max="100" 
//           />
          
//           <div>
//             <label>Gender:</label>
//             <input 
//               type="radio" 
//               name="gender" 
//               value="Male" 
//               checked={formData.gender === 'Male'} 
//               onChange={handleInputChange} 
//             /> Male
//             <input 
//               type="radio" 
//               name="gender" 
//               value="Female" 
//               checked={formData.gender === 'Female'} 
//               onChange={handleInputChange} 
//             /> Female
//           </div>
//           <label>Weight (kg):</label>
//           <input 
//             type="number" 
//             name="weight" 
//             placeholder="Weight (kg)" 
//             value={formData.weight} 
//             onChange={handleInputChange} 
//           />
//           <div>
//             <label>Height:</label>
//             <input 
//               type="number" 
//               name="heightCm" 
//               placeholder="Height (cm)" 
//               value={formData.heightCm} 
//               onChange={handleInputChange} 
//             />
//             <span>or</span>
//             <input 
//               type="number" 
//               name="heightFeet" 
//               placeholder="Feet" 
//               value={formData.heightFeet} 
//               onChange={handleInputChange} 
//             />
//             <input 
//               type="number" 
//               name="heightInches" 
//               placeholder="Inches" 
//               value={formData.heightInches} 
//               onChange={handleInputChange} 
//             />
//           </div>
//         </section>

//         <section>
//           <h3>Diet Type</h3>
//           <select 
//             name="dietType" 
//             value={formData.dietType} 
//             onChange={handleInputChange}
//           >
//             <option value="">Select Diet Type</option>
//             <option value="Vegetarian">Vegetarian</option>
//             <option value="Non-Vegetarian">Non-Vegetarian</option>
//           </select>
//         </section>

//         <section>
//           <h3>Activity Level</h3>
//           <div>
//             <input 
//               type="radio" 
//               name="activityLevel" 
//               value="Sedentary" 
//               checked={formData.activityLevel === 'Sedentary'} 
//               onChange={handleInputChange} 
//             /> Sedentary
//             <input 
//               type="radio" 
//               name="activityLevel" 
//               value="Mildly Active" 
//               checked={formData.activityLevel === 'Mildly Active'} 
//               onChange={handleInputChange} 
//             /> Mildly Active
//             <input 
//               type="radio" 
//               name="activityLevel" 
//               value="Moderately Active" 
//               checked={formData.activityLevel === 'Moderately Active'} 
//               onChange={handleInputChange} 
//             /> Moderately Active
//             <input 
//               type="radio" 
//               name="activityLevel" 
//               value="Very Active" 
//               checked={formData.activityLevel === 'Very Active'} 
//               onChange={handleInputChange} 
//             /> Very Active
//           </div>
//         </section>

//         <section>
//           <h3>Kidney Disease and Comorbidities</h3>
//           <div>
//             <label>Do you have kidney disease?</label>
//             <input 
//               type="radio" 
//               name="kidneyDisease" 
//               value="Yes" 
//               checked={formData.kidneyDisease === 'Yes'} 
//               onChange={handleInputChange} 
//             /> Yes
//             <input 
//               type="radio" 
//               name="kidneyDisease" 
//               value="No" 
//               checked={formData.kidneyDisease === 'No'} 
//               onChange={handleInputChange} 
//             /> No
//           </div>
//           <div>
//             <label>Comorbidities:</label>
//             <input 
//               type="checkbox" 
//               name="comorbidities" 
//               value="Diabetes" 
//               checked={formData.comorbidities.includes('Diabetes')} 
//               onChange={(e) => {
//                 const newComorbidities = e.target.checked
//                   ? [...formData.comorbidities, 'Diabetes']
//                   : formData.comorbidities.filter((item) => item !== 'Diabetes');
//                 setFormData({ ...formData, comorbidities: newComorbidities });
//               }} 
//             /> Diabetes
//             <input 
//               type="checkbox" 
//               name="comorbidities" 
//               value="Hypertension" 
//               checked={formData.comorbidities.includes('Hypertension')} 
//               onChange={(e) => {
//                 const newComorbidities = e.target.checked
//                   ? [...formData.comorbidities, 'Hypertension']
//                   : formData.comorbidities.filter((item) => item !== 'Hypertension');
//                 setFormData({ ...formData, comorbidities: newComorbidities });
//               }} 
//             /> Hypertension
//             {/* Additional checkboxes for other comorbidities */}
//           </div>
//         </section>

//         <button type="submit">Submit My Details</button>
//       </form>

//       {formData.bmi && (
//         <div>
//           <h3>Results</h3>
//           <p>Your BMI is {formData.bmi.toFixed(1)}, which is considered {formData.bmiCategory}.</p>
//           <p>Your Ideal Body Weight (IBW) is {formData.idealWeight} kg.</p>
//           <p>Your adjusted target weight is {formData.adjustedWeight.toFixed(1)} kg.</p>
//           <p>
//             You are {formData.weightDifference.toFixed(1)} kg {formData.weightDifference > 0 ? 'above' : 'below'} your adjusted target weight.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default KidneyDietForm;























// import React, { useState } from "react";
// import axios from "axios";

// const DietPlanForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     age: "",
//     gender: "",
//     weight: "",
//     heightCm: "",
//     heightFt: "",
//     heightIn: "",
//     heightUnit: "cm",
//     dietType: "",
//     subDietType: "",
//     flexSubOption: "",
//     activityLevel: "",
//     hasKidneyDisease: "",
//     kidneyCondition: "",
//     otherConditions: [],
//     otherConditionDetails: "",
//     weightDiff: "",
//     abw: "",
//     ibw: "",
//     bmi: "",
//   });

//   const [results, setResults] = useState({
//     bmi: null,
//     ibw: null,
//     abw: null,
//     weightDiff: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData((prev) => ({
//         ...prev,
//         otherConditions: checked
//           ? [...prev.otherConditions, value]
//           : prev.otherConditions.filter((item) => item !== value),
//       }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const calculateResults = () => {
//     const weight = parseFloat(formData.weight);
//     let heightInMeters;
//     if (formData.heightUnit === "cm") {
//       heightInMeters = parseFloat(formData.heightCm) / 100;
//     } else {
//       heightInMeters =
//         (parseFloat(formData.heightFt) * 12 + parseFloat(formData.heightIn)) *
//         0.0254;
//     }

//     const bmi = weight / heightInMeters ** 2;

//     const ibw =
//       formData.gender === "Male"
//         ? parseFloat(formData.heightCm || 0) - 100
//         : parseFloat(formData.heightCm || 0) - 105;

//     const abw = bmi >= 18.5 && bmi <= 24.9 ? ibw : ibw + 0.25 * (weight - ibw);

//     const weightDiff = weight - abw;

//     setResults({
//       bmi: bmi.toFixed(1),
//       ibw: ibw.toFixed(1),
//       abw: abw.toFixed(1),
//       weightDiff: weightDiff.toFixed(1),
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     calculateResults();
//     try {
//       await axios.post("http://localhost:5000/api/diet", formData);
//       alert("Details submitted successfully!");
//     } catch (error) {
//       alert("There was an error submitting your details.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h1>Your Personalized Kidney-Friendly Diet Plan</h1>
//       <p>
//         Managing kidney health through diet can feel overwhelming, but you're
//         not alone...
//       </p>

//       <h2>1. Personal Information</h2>
//       <label>
//         Name:
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <label>
//         Age:
//         <input
//           type="number"
//           name="age"
//           value={formData.age}
//           onChange={handleChange}
//           min="18"
//           max="100"
//           required
//         />
//       </label>
//       <label>
//         Gender:
//         <label>
//           <input
//             type="radio"
//             name="gender"
//             value="Male"
//             onChange={handleChange}
//           />{" "}
//           Male
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="gender"
//             value="Female"
//             onChange={handleChange}
//           />{" "}
//           Female
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="gender"
//             value="Other"
//             onChange={handleChange}
//           />{" "}
//           Other
//         </label>
//       </label>
//       <br></br>
//       <label>
//         Weight (kg):
//         <input
//           type="number"
//           name="weight"
//           value={formData.weight}
//           onChange={handleChange}
//           required
//         />
//       </label>
//       <label>
//         Height:
//         <select
//           name="heightUnit"
//           value={formData.heightUnit}
//           onChange={handleChange}
//         >
//           <option value="cm">Centimeters</option>
//           <option value="ft">Feet/Inches</option>
//         </select>
//         {formData.heightUnit === "cm" ? (
//           <input
//             type="number"
//             name="heightCm"
//             value={formData.heightCm}
//             onChange={handleChange}
//             required
//           />
//         ) : (
//           <>
//             <input
//               type="number"
//               name="heightFt"
//               placeholder="Feet"
//               value={formData.heightFt}
//               onChange={handleChange}
//               required
//             />
//             <input
//               type="number"
//               name="heightIn"
//               placeholder="Inches"
//               value={formData.heightIn}
//               onChange={handleChange}
//               required
//             />
//           </>
//         )}
//       </label>

//       <h2>2. Diet Type</h2>
//       <label>
//         Diet Type:
//         <select
//           name="dietType"
//           value={formData.dietType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select...</option>
//           <option value="Vegetarian">Vegetarian</option>
//           <option value="Non-Vegetarian">Non-Vegetarian</option>
//         </select>
//       </label>
//       {formData.dietType === "Vegetarian" && (
//         <select
//           name="subDietType"
//           value={formData.subDietType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Sub-type...</option>
//           <option value="Lacto">
//             Lacto Vegetarian (Includes dairy, but no eggs)
//           </option>
//           <option value="Ovo">
//             Ovo Vegetarian (Includes eggs, but no dairy)
//           </option>
//           <option value="vegan">Vegan (Excludes all animal products)</option>
//         </select>
//       )}
//       {formData.dietType === "Non-Vegetarian" && (
//         <select
//           name="subDietType"
//           value={formData.subDietType}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Select Sub-type...</option>
//           <option value="Pescatarian">
//             Pescatarian (Includes fish and seafood, but no other meat)
//           </option>
//           <option value="Poultry-based">
//             {" "}
//             Poultry-based (Includes chicken, turkey, etc.)
//           </option>
//           <option value="Red Meat_based">
//             Red Meat-based (Includes beef, lamb, pork, etc.)
//           </option>
//           <option value="Flexitarion">
//             Flexitarion (Mainly plant-based but occasionally includes meat,
//             poultry, or fish)
//           </option>
//         </select>
//       )}
//       <h2>Activity Level</h2>
//       <label>
//         <input
//           type="radio"
//           name="activityLevel"
//           value="Sedentary"
//           checked={formData.activityLevel === "Sedentary"}
//           onChange={handleChange}
//         />{" "}
//         Sedentary
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="radio"
//           name="activityLevel"
//           value="Mildly Active"
//           checked={formData.activityLevel === "Mildly Active"}
//           onChange={handleChange}
//         />{" "}
//         Mildly Active
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="radio"
//           name="activityLevel"
//           value="Moderately Active"
//           checked={formData.activityLevel === "Moderately Active"}
//           onChange={handleChange}
//         />{" "}
//         Moderately Active
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="radio"
//           name="activityLevel"
//           value="Very Active"
//           checked={formData.activityLevel === "Very Active"}
//           onChange={handleChange}
//         />{" "}
//         Very Active
//       </label>
//       <br></br>

//       <h2>Health Conditions</h2>
//       <label>
//         Do you have kidney disease?
//         <input
//           type="radio"
//           name="hasKidneyDisease"
//           value="true"
//           checked={formData.hasKidneyDisease === "true"}
//           onChange={handleChange}
//         />{" "}
//         Yes
//         <input
//           type="radio"
//           name="hasKidneyDisease"
//           value="false"
//           checked={formData.hasKidneyDisease === "false"}
//           onChange={handleChange}
//         />{" "}
//         No
//       </label>
//       <br></br>
//       {formData.hasKidneyDisease === "true" && (
//         <label>
//           Kidney Condition:
//           <input
//             type="text"
//             name="kidneyCondition"
//             value={formData.kidneyCondition}
//             onChange={handleChange}
//           />
//         </label>
//       )}
//       <br></br>
//       <label>Other Health Conditions:</label>
//       <br></br>
//       <label>
//         <input
//           type="checkbox"
//           name="otherConditions"
//           value="Diabetes"
//           checked={formData.otherConditions.includes("Diabetes")}
//           onChange={handleChange}
//         />{" "}
//         Diabetes
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="checkbox"
//           name="otherConditions"
//           value="Hypertension"
//           checked={formData.otherConditions.includes("Hypertension")}
//           onChange={handleChange}
//         />{" "}
//         Hypertension
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="checkbox"
//           name="otherConditions"
//           value="Gout"
//           checked={formData.otherConditions.includes("Gout")}
//           onChange={handleChange}
//         />{" "}
//         Gout
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="checkbox"
//           name="otherConditions"
//           value="Cardiovascular Disease"
//           checked={formData.otherConditions.includes("Cardiovascular Disease")}
//           onChange={handleChange}
//         />{" "}
//         Cardiovascular Disease
//       </label>
//       <br></br>
//       <label>
//         <input
//           type="checkbox"
//           name="otherConditions"
//           value="Other"
//           checked={formData.otherConditions.includes("Other")}
//           onChange={handleChange}
//         />{" "}
//         Other
//       </label>
//       <br></br>

//       <h2>Results</h2>

//       <button type="submit">Submit My Details</button>

//       {results.bmi && (
//         <div>
//           <h3>Your Results</h3>
//           <p>
//             <strong>BMI:</strong> {results.bmi}{" "}
//             <span title="BMI is calculated using your weight and height. A BMI in the range of 18.5–24.9 is considered normal weight.">
//               (i)
//             </span>
//           </p>
//           <p>
//             <strong>Ideal Body Weight (IBW):</strong> {results.ibw} kg{" "}
//             <span title="IBW is calculated using Broca’s formula based on your height and gender.">
//               (i)
//             </span>
//           </p>
//           <p>
//             <strong>Adjusted Body Weight (ABW):</strong> {results.abw} kg{" "}
//             <span title="ABW is calculated based on your Ideal Body Weight (IBW) and BMI. If your BMI is outside the normal range, we adjust the weight to provide a more accurate target.">
//               (i)
//             </span>
//           </p>
//           <p>
//             <strong>Weight Difference:</strong> {Math.abs(results.weightDiff)}{" "}
//             kg{" "}
//             {results.weightDiff > 0
//               ? `above your adjusted target weight.`
//               : `below your adjusted target weight.`}
//             <span title="This is the difference between your actual weight and adjusted target weight. Adjusting your weight towards this target can improve overall health.">
//               (i)
//             </span>
//           </p>
//         </div>
//       )}
//     </form>
//   );
// };

// export default DietPlanForm;
