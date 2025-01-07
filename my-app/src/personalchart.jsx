import React, { useState } from "react";

const PersonalizedDietChart = () => {
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [snacksPerDay, setSnacksPerDay] = useState("");
  const [foodAllergies, setFoodAllergies] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text", event.target.id);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedElement = document.getElementById(data);
    event.target.appendChild(draggedElement);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <section id="personalized-diet-chart">
      <h2>Get Personalized Diet Chart</h2>
      <p>
        We understand that managing kidney health through diet can be
        challenging, and we're here to make it easier for you. By collecting a
        bit more information about your eating habits, we can create a diet
        plan tailored specifically to your needs.
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
        <input type="text" id="full-name" name="full-name" required />
        <br />
        <br />

        <label htmlFor="phone-number">Phone Number:</label>
        <input type="tel" id="phone-number" name="phone-number" required />
        <br />
        <br />

        <label htmlFor="email-address">Email Address:</label>
        <input type="email" id="email-address" name="email-address" required />
        <br />
        <br />

        <p>
          Note: We respect your privacy. Your details will only be used to
          create a personalized diet chart and will not be shared with third
          parties.
        </p>

        <h3>Diet and Meal Preferences</h3>
        <label htmlFor="meals-per-day">
          How many meals do you typically have per day?
        </label>
        <br />
        {["1 meal", "2 meals", "3 meals", "more than 3 meals"].map((meal, idx) => (
          <React.Fragment key={idx}>
            <input
              type="radio"
              id={`meal-${idx}`}
              name="meals-per-day"
              value={meal}
              onChange={(e) => setMealsPerDay(e.target.value)}
            />
            <label htmlFor={`meal-${idx}`}>{meal}</label>
            {meal === "more than 3 meals" && (
              <input
                type="text"
                id="meals-textbox"
                name="meals-textbox"
                disabled={mealsPerDay !== "more than 3 meals"}
              />
            )}
            <br />
          </React.Fragment>
        ))}
        <br />

        <label htmlFor="snacks-per-day">
          How many snacks do you typically have per day?
        </label>
        <br />
        {["1 snack", "2 snacks", "3 snacks", "more than 3 snacks"].map((snack, idx) => (
          <React.Fragment key={idx}>
            <input
              type="radio"
              id={`snack-${idx}`}
              name="snacks-per-day"
              value={snack}
              onChange={(e) => setSnacksPerDay(e.target.value)}
            />
            <label htmlFor={`snack-${idx}`}>{snack}</label>
            {snack === "more than 3 snacks" && (
              <input
                type="text"
                id="snacks-textbox"
                name="snacks-textbox"
                disabled={snacksPerDay !== "more than 3 snacks"}
              />
            )}
            <br />
          </React.Fragment>
        ))}
        <br />

        <label htmlFor="majority-food-consumption">
          When do you consume the majority of your food (calories) during the
          day?
        </label>
        <br />
        {["Breakfast", "Lunch", "Dinner", "Evenly distributed throughout the day"].map(
          (time, idx) => (
            <React.Fragment key={idx}>
              <input
                type="radio"
                id={`food-${idx}`}
                name="majority-food-consumption"
                value={time}
              />
              <label htmlFor={`food-${idx}`}>{time}</label>
              <br />
            </React.Fragment>
          )
        )}
        <br />

        <h3>Dietary Restrictions or Sensitivities</h3>
        <label htmlFor="food-allergies">
          Do you have any food allergies or intolerances?
        </label>
        <br />
        {["No", "Yes"].map((response, idx) => (
          <React.Fragment key={idx}>
            <input
              type="radio"
              id={`allergy-${idx}`}
              name="food-allergies"
              value={response}
              onChange={(e) => setFoodAllergies(response === "Yes" ? e.target.value : "")}
            />
            <label htmlFor={`allergy-${idx}`}>{response}</label>
            {response === "Yes" && (
              <input
                type="text"
                id="allergies-textbox"
                name="allergies-textbox"
                disabled={foodAllergies !== "Yes"}
              />
            )}
            <br />
          </React.Fragment>
        ))}
        <br />

        <label htmlFor="dietary-restrictions">
          Do you follow any specific dietary patterns or restrictions (e.g.,
          vegan, gluten-free, low sodium, etc.)?
        </label>
        <br />
        {["No", "Yes"].map((response, idx) => (
          <React.Fragment key={idx}>
            <input
              type="radio"
              id={`restriction-${idx}`}
              name="dietary-restrictions"
              value={response}
              onChange={(e) =>
                setDietaryRestrictions(response === "Yes" ? e.target.value : "")
              }
            />
            <label htmlFor={`restriction-${idx}`}>{response}</label>
            {response === "Yes" && (
              <input
                type="text"
                id="restrictions-textbox"
                name="restrictions-textbox"
                disabled={dietaryRestrictions !== "Yes"}
              />
            )}
            <br />
          </React.Fragment>
        ))}
        <br />

        <h3>Meal and Snack Distribution</h3>
        <p>
          Please drag and drop your meals/snacks in order of when you typically
          consume them.
        </p>
        <div
          id="meal-distribution"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {[
            "Breakfast",
            "Lunch",
            "Dinner",
            "Snacks (Morning)",
            "Snacks (Afternoon)",
            "Snacks (Evening)",
          ].map((meal, idx) => (
            <div
              key={idx}
              className="draggable"
              draggable="true"
              id={`drag-${idx}`}
              onDragStart={handleDragStart}
            >
              {meal}
            </div>
          ))}
        </div>
        <br />
        <br />

        
        <button type="submit" value="Get Personalized Diet Chart">Get Personalized Deit Chart</button>
      </form>
    </section>
  );
};

export default PersonalizedDietChart;
