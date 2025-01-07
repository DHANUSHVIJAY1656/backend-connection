import React, {  useState } from "react";

const PersonalizedChart = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    mealsPerDay: "",
    snacksPerDay: "",
    majorityFoodConsumption: "",
    foodAllergies: "",
    allergiesText: "",
    dietaryRestrictions: "",
    restrictionsText: "",
    mealOrder: ["breakfast", "lunch", "dinner", "snacks-morning", "snacks-afternoon", "snacks-evening"],
    dietGoals: [],
    goalOtherText: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      dietGoals: checked
        ? [...prevData.dietGoals, name]
        : prevData.dietGoals.filter((goal) => goal !== name),
    }));
  };

  const handleMealOrderChange = (event) => {
    const { id } = event.target;
    setFormData((prevData) => {
      const newOrder = prevData.mealOrder.filter((item) => item !== id);
      newOrder.push(id);
      return { ...prevData, mealOrder: newOrder };
    });
  };

  const handleReview = () => {
    document.getElementById("review-screen").style.display = "block";
  };

  const handleConfirmSubmit = () => {
    
    // Add submit functionality here
    alert("Diet chart generated!");
    // Simulate progress bar
    document.getElementById("progress-bar").style.display = "block";
    let progress = 0;
    const interval = setInterval(() => {
      if (progress < 100) {
        progress += 10;
        document.getElementById("progress").value = progress;
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleGoalOtherChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      goalOtherText: e.target.value,
    }));
  };
  

  return (
    <section id="personalized-diet-chart">
      <h2>Get Personalized Diet Chart</h2>
      <p>
        We understand that managing kidney health through diet can be
        challenging, and we're here to make it easier for you. By collecting a
        bit more information about your eating habits, we can create a diet plan
        tailored specifically to your needs.
      </p>
      <p>
        This personalized diet chart is designed to help you feel better, stay
        on track, and manage your kidney health with the right balance of
        nutrients. We just need a bit more information to make sure that
        everything is perfectly aligned with your routine, preferences, and
        lifestyle.
      </p>

      <h3>Personal Information and Contact Details</h3>
      <form id="personalized-diet-form">
        <label htmlFor="full-name">Full Name:</label>
        <input
          type="text"
          style={{ borderRadius: "10px" }}
          id="full-name"
          name="full-name"
          required
          value={formData.fullName}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="phone-number">Phone Number:</label>
        <input
          type="tel"
          style={{ borderRadius: "5px" }}
          id="phone-number"
          name="phone-number"
          required
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="email-address">Email Address:</label>
        <input
          type="email"
          style={{ borderRadius: "5px" }}
          id="email-address"
          name="email-address"
          required
          value={formData.emailAddress}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <p>
          Note: We respect your privacy. Your details will only be used to
          create a personalized diet chart and will not be shared with third
          parties.
        </p>

        <h3>Diet and Meal Preferences</h3>
        <label htmlFor="meals-per-day">How many meals do you typically have per day?</label>
        <br />
        <input
          type="radio"
          id="1-meal"
          name="meals-per-day"
          value="1 meal"
          onChange={handleInputChange}
        />
        <label htmlFor="1-meal">1 meal</label>
        <br />
        <input
          type="radio"
          id="2-meals"
          name="meals-per-day"
          value="2 meals"
          onChange={handleInputChange}
        />
        <label htmlFor="2-meals">2 meals</label>
        <br />
        <input
          type="radio"
          id="3-meals"
          name="meals-per-day"
          value="3 meals"
          onChange={handleInputChange}
        />
        <label htmlFor="3-meals">3 meals</label>
        <br />
        <input
          type="radio"
          id="more-meals"
          name="meals-per-day"
          value="more than 3 meals"
          onChange={handleInputChange}
        />
        <label htmlFor="more-meals">More than 3 meals (please specify):</label>
        <input
          type="text"
          id="meals-textbox"
          name="meals-textbox"
          value={formData.mealsText}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <label htmlFor="snacks-per-day">How many snacks do you typically have per day?</label>
        <br />
        <input
          type="radio"
          id="1-snack"
          name="snacks-per-day"
          value="1 snack"
          onChange={handleInputChange}
        />
        <label htmlFor="1-snack">1 snack</label>
        <br />
        <input
          type="radio"
          id="2-snacks"
          name="snacks-per-day"
          value="2 snacks"
          onChange={handleInputChange}
        />
        <label htmlFor="2-snacks">2 snacks</label>
        <br />
        <input
          type="radio"
          id="3-snacks"
          name="snacks-per-day"
          value="3 snacks"
          onChange={handleInputChange}
        />
        <label htmlFor="3-snacks">3 snacks</label>
        <br />
        <input
          type="radio"
          id="more-snacks"
          name="snacks-per-day"
          value="more than 3 snacks"
          onChange={handleInputChange}
        />
        <label htmlFor="more-snacks">More than 3 snacks (please specify):</label>
        <input
          type="text"
          id="snacks-textbox"
          name="snacks-textbox"
          value={formData.snacksText}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <label htmlFor="majority-food-consumption">
          When do you consume the majority of your food (calories) during the day?
        </label>
        <br />
        <input
          type="radio"
          id="breakfast-majority"
          name="majority-food-consumption"
          value="breakfast"
          onChange={handleInputChange}
        />
        <label htmlFor="breakfast-majority">Breakfast</label>
        <br />
        <input
          type="radio"
          id="lunch-majority"
          name="majority-food-consumption"
          value="lunch"
          onChange={handleInputChange}
        />
        <label htmlFor="lunch-majority">Lunch</label>
        <br />
        <input
          type="radio"
          id="dinner-majority"
          name="majority-food-consumption"
          value="dinner"
          onChange={handleInputChange}
        />
        <label htmlFor="dinner-majority">Dinner</label>
        <br />
        <input
          type="radio"
          id="evenly-distributed"
          name="majority-food-consumption"
          value="evenly-distributed"
          onChange={handleInputChange}
        />
        <label htmlFor="evenly-distributed">Evenly distributed throughout the day</label>
        <br />
        <br />

        <h3>Dietary Restrictions or Sensitivities</h3>
        <label htmlFor="food-allergies">Do you have any food allergies or intolerances?</label>
        <br />
        <input
          type="radio"
          id="no-allergies"
          name="food-allergies"
          value="no"
          onChange={handleInputChange}
        />
        <label htmlFor="no-allergies">No</label>
        <br />
        <input
          type="radio"
          id="yes-allergies"
          name="food-allergies"
          value="yes"
          onChange={handleInputChange}
        />
        <label htmlFor="yes-allergies">Yes (Please specify):</label>
        <input
          type="text"
          id="allergies-textbox"
          name="allergies-textbox"
          value={formData.allergiesText}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <label htmlFor="dietary-restrictions">
          Do you follow any specific dietary patterns or restrictions (e.g., vegan, gluten-free, low sodium, etc.)?
        </label>
        <br />
        <input
          type="radio"
          id="no-restrictions"
          name="dietary-restrictions"
          value="no"
          onChange={handleInputChange}
        />
        <label htmlFor="no-restrictions">No</label>
        <br />
        <input
          type="radio"
          id="yes-restrictions"
          name="dietary-restrictions"
          value="yes"
          onChange={handleInputChange}
        />
        <label htmlFor="yes-restrictions">Yes (Please specify):</label>
        <input
          type="text"
          id="restrictions-textbox"
          name="restrictions-textbox"
          value={formData.restrictionsText}
          onChange={handleInputChange}
        />
        <br />
        <br />

        <h3>Meal and Snack Distribution</h3>
        <p>Please drag and drop your meals/snacks in order of when you typically consume them.</p>
        <div id="meal-distribution">
          {formData.mealOrder.map((meal, index) => (
            <div
              key={index}
              className="draggable"
              draggable="true"
              id={meal}
              onDragStart={(e) => handleMealOrderChange(e)}
            >
              {meal.charAt(0).toUpperCase() + meal.slice(1).replace(/-/g, " ")}
            </div>
          ))}
        </div>
        <br />
        <br />

        <h3>Goals for Your Diet Chart (Optional)</h3>
        <label htmlFor="diet-goals">Select all that apply:</label>
        <br />
        <input
          type="checkbox"
          id="goal-ckd"
          name="diet-goals"
          value="Optimize dietary management of CKD, avoid malnutrition"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="goal-ckd">Optimize dietary management of CKD, avoid malnutrition</label>
        <br />
        <input
          type="checkbox"
          id="goal-weight"
          name="diet-goals"
          value="Manage weight"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="goal-weight">Manage weight</label>
        <br />
        <input
          type="checkbox"
          id="goal-potassium"
          name="diet-goals"
          value="Issues with potassium and phosphorus"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="goal-potassium">Issues with potassium and phosphorus</label>
        <br />
        <input
          type="checkbox"
          id="goal-other"
          name="diet-goals"
          value="Other"
          onChange={handleCheckboxChange}
        />
        <label htmlFor="goal-other">Other</label>
        {formData.dietGoals.includes("Other") && (
          <input
            type="text"
            id="goal-other-textbox"
            name="goal-other-textbox"
            value={formData.goalOtherText}
            onChange={handleGoalOtherChange}
            style={{ display: "inline-block" }}
            placeholder="Please specify"
          />
        )}
        <br />
        <br />

        <button
          type="submit"
          style={{ borderRadius: "10px" }}
          id="review-button"
          value="Review Your Details"
          onClick={handleReview}>
            Review Your Details
          </button>
        <button
          type="submit"
          style={{ borderRadius: "10px" }}
          id="submit-button"
          value="Generate My Personalized Diet Chart"
          onClick={handleConfirmSubmit}>
            Generate My Personalized Deit Chart
          </button>

        <div id="review-screen" style={{ display: "none" }}>
          <h3>Review Your Details</h3>
          <p>Please review your details before submitting:</p>
          <div id="review-details"></div>
          <button
            type="submit"
            style={{ borderRadius: "10px" }}
            id="confirm-button"
            value="Confirm and Submit"
            onClick={handleConfirmSubmit}>
              Conform and Submit
            </button>
          <button
            type="submit"
            style={{ borderRadius: "10px" }}
            id="edit-button"
            value="Edit Details"> Edit Details</button>
        </div>
        <div id="progress-bar" style={{ display: "none" }}>
          <progress id="progress" max="100" value="0"></progress>
        </div>
      </form>
    </section>
  );
};

export default PersonalizedChart;
