import React, { useState } from "react";
import axios from 'axios';
const KidneyDietForm = () => {
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
    dietSubType: "",
    flexOption: "",
    activityLevel: "",
    kidneyDisease: "",
    kidneyCondition: "",
    comorbidities: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        comorbidities: checked
          ? [...prev.comorbidities, value]
          : prev.comorbidities.filter((item) => item !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/kidney-diet", formData);
      console.log("Form Data Submitted:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form.");
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <h1>Your Personalized Kidney-Friendly Diet Plan</h1>
      <p>
        Managing kidney health through diet can feel overwhelming, but you're
        not alone. At KidneyNeeds, we understand the challenges of balancing
        your nutritional needs with the restrictions that come with kidney
        disease.
      </p>

      {/* Personal Information */}
      <h2>Personal Information</h2>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Age:
        <input
          type="number"
          name="age"
          min="18"
          max="100"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <label>
        Gender:
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={formData.gender === "Male"}
          onChange={handleChange}
        />{" "}
        Male
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={formData.gender === "Female"}
          onChange={handleChange}
        />{" "}
        Female
        <input
          type="radio"
          name="gender"
          value="Other"
          checked={formData.gender === "Other"}
          onChange={handleChange}
        />{" "}
        Other
      </label>
      <br />

      <label>
        Weight (kg):
        <input
          type="number"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </label>
      <br />

      <h3>Height</h3>
      <label>
        <input
          type="radio"
          name="heightUnit"
          value="cm"
          checked={formData.heightUnit === "cm"}
          onChange={handleChange}
        />{" "}
        Centimeters:
        <input
          type="number"
          name="heightCm"
          value={formData.heightCm}
          onChange={handleChange}
          disabled={formData.heightUnit !== "cm"}
        />
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="heightUnit"
          value="ft"
          checked={formData.heightUnit === "ft"}
          onChange={handleChange}
        />{" "}
        Feet and Inches:
        <input
          type="number"
          name="heightFt"
          value={formData.heightFt}
          onChange={handleChange}
          disabled={formData.heightUnit !== "ft"}
        />
        Feet
        <input
          type="number"
          name="heightIn"
          value={formData.heightIn}
          onChange={handleChange}
          disabled={formData.heightUnit !== "ft"}
        />
        Inches
      </label>
      <br />

      {/* Diet Type */}
      <h2>Diet Type</h2>
      <label>
        Select Diet Type:
        <select name="dietType" value={formData.dietType} onChange={handleChange} required>
          <option value="">-- Select --</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
          <option value="Flexitarian">Flexitarian</option>
        </select>
      </label>
      <br />

      {formData.dietType === "Vegetarian" && (
        <label>
          Vegetarian Sub-Type:
          <select
            name="dietSubType"
            value={formData.dietSubType}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="Lacto Vegetarian">Lacto Vegetarian</option>
            <option value="Ovo Vegetarian">Ovo Vegetarian</option>
            <option value="Lacto-Ovo Vegetarian">Lacto-Ovo Vegetarian</option>
            <option value="Vegan">Vegan</option>
          </select>
        </label>
      )}

      {formData.dietType === "Non-Vegetarian" && (
        <label>
          Non-Vegetarian Sub-Type:
          <select
            name="dietSubType"
            value={formData.dietSubType}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="Pescatarian">Pescatarian</option>
            <option value="Poultry-based">Poultry-based</option>
            <option value="Red Meat-based">Red Meat-based</option>
          </select>
        </label>
      )}

      {formData.dietType === "Flexitarian" && (
        <label>
          Flexitarian Pattern:
          <select
            name="flexOption"
            value={formData.flexOption}
            onChange={handleChange}
          >
            <option value="">-- Select --</option>
            <option value="Mostly Plant-Based with Occasional Meat">
              Mostly Plant-Based with Occasional Meat
            </option>
            <option value="Mostly Plant-Based with Occasional Fish/Seafood">
              Mostly Plant-Based with Occasional Fish/Seafood
            </option>
            <option value="Mostly Plant-Based with Occasional Poultry">
              Mostly Plant-Based with Occasional Poultry
            </option>
            <option value="Occasional Meat, Fish, and Poultry">
              Occasional Meat, Fish, and Poultry
            </option>
          </select>
        </label>
      )}
      <br />

      {/* Activity Level */}
      <h2>Activity Level</h2>
      <label>
        <select
          name="activityLevel"
          value={formData.activityLevel}
          onChange={handleChange}
        >
          <option value="">-- Select --</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Mildly Active">Mildly Active</option>
          <option value="Moderately Active">Moderately Active</option>
          <option value="Very Active">Very Active</option>
        </select>
      </label>
      <br />

      {/* Kidney Disease */}
      <h2>Kidney Disease</h2>
      <label>
        Do you have kidney disease?
        <input
          type="radio"
          name="kidneyDisease"
          value="Yes"
          checked={formData.kidneyDisease === "Yes"}
          onChange={handleChange}
        />{" "}
        Yes
        <input
          type="radio"
          name="kidneyDisease"
          value="No"
          checked={formData.kidneyDisease === "No"}
          onChange={handleChange}
        />{" "}
        No
      </label>
      <br />
      {formData.kidneyDisease === "Yes" && (
        <label>
          Kidney Condition:
          <input
            type="text"
            name="kidneyCondition"
            value={formData.kidneyCondition}
            onChange={handleChange}
          />
        </label>
      )}
      <br />

      <h2>Other Health Conditions</h2>
      <label>
        <input
          type="checkbox"
          name="comorbidities"
          value="Diabetes"
          checked={formData.comorbidities.includes("Diabetes")}
          onChange={handleChange}
        />{" "}
        Diabetes
      </label>
      <label>
        <input
          type="checkbox"
          name="comorbidities"
          value="Hypertension"
          checked={formData.comorbidities.includes("Hypertension")}
          onChange={handleChange}
        />{" "}
        Hypertension
      </label>
      <label>
        <input
          type="checkbox"
          name="comorbidities"
          value="Gout"
          checked={formData.comorbidities.includes("Gout")}
          onChange={handleChange}
        />{" "}
        Gout
      </label>
      <label>
        <input
          type="checkbox"
          name="comorbidities"
          value="Cardiovascular Disease"
          checked={formData.comorbidities.includes("Cardiovascular Disease")}
          onChange={handleChange}
        />{" "}
        Cardiovascular Disease
      </label>
      <label>
        <input
          type="checkbox"
          name="comorbidities"
          value="Other"
          checked={formData.comorbidities.includes("Other")}
          onChange={handleChange}
        />{" "}
        Other
      </label>
      <br />

      <button type="submit">Submit My Details</button>
    </form>
  );
};

export default KidneyDietForm;
