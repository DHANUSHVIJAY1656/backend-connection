import React, { useState } from 'react';
import axios from 'axios';

const DietForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    heightCm: '',
    heightFt: '',
    heightIn: '',
    heightUnit: 'cm',
    dietType: '',
    dietSubType: '',
    activityLevel: '',
    hasKidneyDisease: false,
    kidneyCondition: '',
    hasDiabetes: false,
    hasHypertension: false,
    hasGout: false,
    hasCardiovascularDisease: false,
    hasOtherComorbidity: false,
    otherComorbidityDetails: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/diet', formData);
      console.log('Form submitted successfully:', response.data);
      alert('Form submitted successfully!');
    } catch (error) {
      console.error('There was an error submitting the form:', error);
      alert('Failed to submit the form. Please try again.');
    }
  };

  return (
    <>
      <h1>Your Personalized Kidney-Friendly Diet Plan</h1>
      <p>
        Managing kidney health through diet can feel overwhelming, but you're not alone. At KidneyNeeds, we
        understand the challenges of balancing your nutritional needs with the restrictions that come with kidney
        disease. Whether you’re managing CKD, undergoing dialysis, or recovering from a transplant, we’re here to
        help you make the process simpler and easier.
      </p>
      <p>
        This personalized diet plan will guide you through the essential steps to manage your kidney health with
        the right balance of protein, potassium, phosphorus, and calories. By providing us with some basic
        information, we’ll create a diet chart tailored to your unique needs, helping you feel better and stay on
        track.
      </p>	

      <form onSubmit={handleSubmit}>
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
          value="male"
          checked={formData.gender === 'male'}
          onChange={handleChange}
          required
        />{' '}
        Male
        <input
          type="radio"
          name="gender"
          value="female"
          checked={formData.gender === 'female'}
          onChange={handleChange}
          required
        />{' '}
        Female
        <input
          type="radio"
          name="gender"
          value="others"
          checked={formData.gender === 'others'}
          onChange={handleChange}
          required
        />{' '}
        Others
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

      <label>
        Height:
        <br />
        <input
          type="radio"
          name="heightUnit"
          value="cm"
          checked={formData.heightUnit === 'cm'}
          onChange={handleChange}
        />{' '}
        Height in centimeters
        <input
          type="text"
          name="heightCm"
          value={formData.heightCm}
          disabled={formData.heightUnit !== 'cm'}
          onChange={handleChange}
        />
        <br />
        <input
          type="radio"
          name="heightUnit"
          value="ftin"
          checked={formData.heightUnit === 'ftin'}
          onChange={handleChange}
        />{' '}
        Height in feet and inches:
        <br />
        Feet:
        <input
          type="number"
          name="heightFt"
          value={formData.heightFt}
          disabled={formData.heightUnit !== 'ftin'}
          onChange={handleChange}
        />
        Inches:
        <input
          type="number"
          name="heightIn"
          value={formData.heightIn}
          disabled={formData.heightUnit !== 'ftin'}
          onChange={handleChange}
        />
      </label>
      <br />

      <h2>Diet Type</h2>
      <label>Please select your diet preference from the options below:</label>
      <br />
      <input
        type="radio"
        name="dietType"
        value="vegetarian"
        checked={formData.dietType === 'vegetarian'}
        onChange={handleChange}
      />{' '}
      Vegetarian
      <span className="tooltip">(i)
        <span className="tooltip-text">
          Includes no meat or fish. Options include Lacto, Ovo, and Vegan diets.
        </span>
      </span>
      <br />
      <div className="sub-options" id="vegetarian-options">
        <input
          type="radio"
          name="dietSubType"
          value="lacto"
          onChange={handleChange}
        />{' '}
        Lacto Vegetarian (Includes dairy, but no eggs)
        <br />
        <input
          type="radio"
          name="dietSubType"
          value="ovo"
          onChange={handleChange}
        />{' '}
        Ovo Vegetarian (Includes eggs, but no dairy)
        <br />
        <input
          type="radio"
          name="dietSubType"
          value="lacto-ovo"
          onChange={handleChange}
        />{' '}
        Lacto-Ovo Vegetarian (Includes both dairy and eggs)
        <br />
        <input
          type="radio"
          name="dietSubType"
          value="vegan"
          onChange={handleChange}
        />{' '}
        Vegan (Excludes all animal products)
        <br />
      </div>
      <br />
      <input
        type="radio"
        name="dietType"
        value="non-vegetarian"
        checked={formData.dietType === 'non-vegetarian'}
        onChange={handleChange}
      />{' '}
      Non-Vegetarian
      <span className="tooltip">(i)
        <span className="tooltip-text">
          Includes meat, poultry, fish, and other animal-based products. Options may specify preferences or restrictions.
        </span>
      </span>
      <br />
      <div className="sub-options" id="non-vegetarian-options">
        <input
          type="radio"
          name="non-vegetarian-sub"
          value="pescatarian"
          onChange={handleChange}
        />{' '}
        Pescatarian (Includes fish and seafood, but no other meat)
        <br />
        <input
          type="radio"
          name="non-vegetarian-sub"
          value="poultry-based"
          onChange={handleChange}
        />{' '}
        Poultry-based (Includes chicken, turkey, etc.)
        <br />
        <input
          type="radio"
          name="non-vegetarian-sub"
          value="red-meat-based"
          onChange={handleChange}
        />{' '}
        Red Meat-based (Includes beef, lamb, pork, etc.)
        <br />
        <input
          type="radio"
          name="non-vegetarian-sub"
          value="flexitarian"
          onChange={handleChange}
        />{' '}
        Flexitarian (Mainly plant-based but occasionally includes meat, poultry, or fish)
        <br />
      </div>
      <br />

      <h2>Activity Level</h2>
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="sedentary"
          checked={formData.activityLevel === 'sedentary'}
          onChange={handleChange}
        />{' '}
        Sedentary
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="mildly-active"
          checked={formData.activityLevel === 'mildly-active'}
          onChange={handleChange}
        />{' '}
        Mildly Active
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="moderately-active"
          checked={formData.activityLevel === 'moderately-active'}
          onChange={handleChange}
        />{' '}
        Moderately Active
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="activityLevel"
          value="very-active"
          checked={formData.activityLevel === 'very-active'}
          onChange={handleChange}
        />{' '}
        Very Active
      </label>
      <br />

      <h2>Health Conditions</h2>
      <label>
  Do you have kidney disease?
  <input
    type="radio"
    name="hasKidneyDisease"
    value="true" // Set value as string "true"
    checked={formData.hasKidneyDisease === true}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        hasKidneyDisease: e.target.value === "true", 
      }))
    }
  />{' '}
  Yes
  <input
    type="radio"
    name="hasKidneyDisease"
    value="false" // Set value as string "false"
    checked={formData.hasKidneyDisease === false}
    onChange={(e) =>
      setFormData((prevData) => ({
        ...prevData,
        hasKidneyDisease: e.target.value === "true", 
      }))
    }
  />{' '}
  No
</label>

      <br />
      <label>Other Health Conditions:</label>
      <br />
      <input
        type="checkbox"
        name="hasDiabetes"
        checked={formData.hasDiabetes}
        onChange={handleChange}
      />{' '}
      Diabetes
      <br />
      <input
        type="checkbox"
        name="hasHypertension"
        checked={formData.hasHypertension}
        onChange={handleChange}
      />{' '}
      Hypertension
      <br />
      <input
        type="checkbox"
        name="hasGout"
        checked={formData.hasGout}
        onChange={handleChange}
      />{' '}
      Gout
      <br />
      <input
        type="checkbox"
        name="hasCardiovascularDisease"
        checked={formData.hasCardiovascularDisease}
        onChange={handleChange}
      />{' '}
      Cardiovascular Disease
      <br />
      <input
        type="checkbox"
        name="hasOtherComorbidity"
        checked={formData.hasOtherComorbidity}
        onChange={handleChange}
      />{' '}
      Other
      <br />

      <button type="submit">Submit</button>
    </form>
    </>
  );
};

export default DietForm;
