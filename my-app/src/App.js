import React, { useState } from "react";
import axios from "axios";

const DietPlanForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    heightCm: "",
    heightFt: "",
    heightIn: "",
    heightUnit: "cm",
    dietType: "",
    subDietType: "",
    flexSubOption: "",
    activityLevel: "",
    hasKidneyDisease: "",
    kidneyCondition: "",
    otherConditions: [],
    otherConditionDetails: "",
  });

  const [results, setResults] = useState({ bmi: null, ibw: null, abw: null, weightDiff: null });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        otherConditions: checked
          ? [...prev.otherConditions, value]
          : prev.otherConditions.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const calculateResults = () => {
    const weight = parseFloat(formData.weight);
    let heightInMeters;
    if (formData.heightUnit === "cm") {
      heightInMeters = parseFloat(formData.heightCm) / 100;
    } else {
      heightInMeters = (parseFloat(formData.heightFt) * 12 + parseFloat(formData.heightIn)) * 0.0254;
    }

    const bmi = weight / (heightInMeters ** 2);

    const ibw =
      formData.gender === "Male"
        ? (parseFloat(formData.heightCm || 0) - 100)
        : (parseFloat(formData.heightCm || 0) - 105);

    const abw =
      bmi >= 18.5 && bmi <= 24.9
        ? ibw
        : ibw + 0.25 * (weight - ibw);

    const weightDiff = weight - abw;

    setResults({
      bmi: bmi.toFixed(1),
      ibw: ibw.toFixed(1),
      abw: abw.toFixed(1),
      weightDiff: weightDiff.toFixed(1),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    calculateResults();
    try {
      await axios.post("http://localhost:5000/api/diet", formData);
      alert("Details submitted successfully!");
    } catch (error) {
      alert("There was an error submitting your details.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Your Personalized Kidney-Friendly Diet Plan</h1>
      <p>Managing kidney health through diet can feel overwhelming, but you're not alone...</p>

      <h2>1. Personal Information</h2>
      <label>
        Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Age:
        <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="100" required />
      </label>
      <label>
        Gender:
        <label><input type="radio" name="gender" value="Male" onChange={handleChange} /> Male</label>
        <label><input type="radio" name="gender" value="Female" onChange={handleChange} /> Female</label>
        <label><input type="radio" name="gender" value="Other" onChange={handleChange} /> Other</label>
      </label>
      <label>
        Weight (kg):
        <input type="number" name="weight" value={formData.weight} onChange={handleChange} required />
      </label>
      <label>
        Height:
        <select name="heightUnit" value={formData.heightUnit} onChange={handleChange}>
          <option value="cm">Centimeters</option>
          <option value="ft">Feet/Inches</option>
        </select>
        {formData.heightUnit === "cm" ? (
          <input type="number" name="heightCm" value={formData.heightCm} onChange={handleChange} required />
        ) : (
          <>
            <input type="number" name="heightFt" placeholder="Feet" value={formData.heightFt} onChange={handleChange} required />
            <input type="number" name="heightIn" placeholder="Inches" value={formData.heightIn} onChange={handleChange} required />
          </>
        )}
      </label>

      <h2>2. Diet Type</h2>
      <label>
        Diet Type:
        <select name="dietType"  value={formData.dietType} onChange={handleChange} required>
          <option value="">Select...</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>
      </label>
      {formData.dietType === "Vegetarian" && (
        <select name="subDietType" value={formData.subDietType} onChange={handleChange} required>
          <option value="">Select Sub-type...</option>
          <option value="Lacto">Lacto Vegetarian (Includes dairy, but no eggs)</option>
          <option value="Ovo">Ovo Vegetarian (Includes eggs, but no dairy)</option>
          <option value="vegan">Vegan (Excludes all animal products)</option>
        </select>
      )}
        {formData.dietType === "Non-Vegetarian" && (
          <select name="subDietType" value={formData.subDietType} onChange={handleChange} required>
            <option value="">Select Sub-type...</option>
            <option value="Pescatarian">Pescatarian (Includes fish and seafood, but no other meat)</option>
            <option value="Poultry-based"> Poultry-based (Includes chicken, turkey, etc.)</option>
            <option value="Red Meat_based">Red Meat-based (Includes beef, lamb, pork, etc.)</option>
            <option value="Flexitarion">Flexitarion (Mainly plant-based but occasionally includes meat, poultry, or fish)</option>
          </select>
        
      )}
      <h2>Activity Level</h2>
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="Sedentary"
          checked={formData.activityLevel === "Sedentary"}
          onChange={handleChange}
        /> Sedentary
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="Mildly Active"
          checked={formData.activityLevel === "Mildly Active"}
          onChange={handleChange}
        /> Mildly Active
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="Moderately Active"
          checked={formData.activityLevel === "Moderately Active"}
          onChange={handleChange}
        /> Moderately Active
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="Very Active"
          checked={formData.activityLevel === "Very Active"}
          onChange={handleChange}
        /> Very Active
      </label>
      <br></br>

      <h2>Health Conditions</h2>
      <label>
        Do you have kidney disease?
        <input
          type="radio"
          name="hasKidneyDisease"
          value="true"
          checked={formData.hasKidneyDisease === "true"}
          onChange={handleChange}
        /> Yes
        <input
          type="radio"
          name="hasKidneyDisease"
          value="false"
          checked={formData.hasKidneyDisease === "false"}
          onChange={handleChange}
        /> No
      </label>
      <br></br>
      {formData.hasKidneyDisease === "true" && (
        <label>
          Kidney Condition:
          <input
            type="text"
            name="kidneyCondition"
            value={formData.kidneyCondition}
            onChange={handleChange}
          />
        </label>
      )}<br></br>
      <label>Other Health Conditions:</label><br></br>
      <label>
        <input
          type="checkbox"
          name="otherConditions"
          value="Diabetes"
          checked={formData.otherConditions.includes("Diabetes")}
          onChange={handleChange}
        /> Diabetes
      </label>
      <br></br>
      <label>
        <input
          type="checkbox"
          name="otherConditions"
          value="Hypertension"
          checked={formData.otherConditions.includes("Hypertension")}
          onChange={handleChange}
        /> Hypertension
      </label>
      <br></br>
      <label>
        <input
          type="checkbox"
          name="otherConditions"
          value="Gout"
          checked={formData.otherConditions.includes("Gout")}
          onChange={handleChange}
        /> Gout
      </label><br></br>
      <label>
        <input
          type="checkbox"
          name="otherConditions"
          value="Cardiovascular Disease"
          checked={formData.otherConditions.includes("Cardiovascular Disease")}
          onChange={handleChange}
        /> Cardiovascular Disease
      </label><br></br>
      <label>
        <input
          type="checkbox"
          name="otherConditions"
          value="Other"
          checked={formData.otherConditions.includes("Other")}
          onChange={handleChange}
        /> Other
      </label><br></br>

      <h2>Results</h2>
      {results.bmi && (
        <div>
          <p>Your BMI is {results.bmi}.</p>
          <p>Your Ideal Body Weight is {results.ibw} kg.</p>
          <p>Your Adjusted Body Weight is {results.abw} kg.</p>
          <p>You are {Math.abs(results.weightDiff)} kg {results.weightDiff > 0 ? "above" : "below"} your target weight.</p>
        </div>
      )}

      <button type="submit">Submit My Details</button>
    </form>
  );
};

export default DietPlanForm;

