import React, { useState } from "react";

const PersonalizedDiet = () => {
  const [mealsPerDay, setMealsPerDay] = useState("");
  const [snacksPerDay, setSnacksPerDay] = useState("");

  const handleMealChange = (event) => setMealsPerDay(event.target.value);
  const handleSnackChange = (event) => setSnacksPerDay(event.target.value);

  


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
              id={`${meal.replace(" ", "-")}`}
              name="meals-per-day"
              value={meal}
              onChange={handleMealChange}
            />
            <label htmlFor={`${meal.replace(" ", "-")}`}>{meal}</label>
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
              id={`${snack.replace(" ", "-")}`}
              name="snacks-per-day"
              value={snack}
              onChange={handleSnackChange}
            />
            <label htmlFor={`${snack.replace(" ", "-")}`}>{snack}</label>
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

        {["breakfast", "lunch", "dinner"].map((meal, idx) => (
          <div key={idx}>
            <label htmlFor={`${meal}-time`}>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</label>
            <input type="time" id={`${meal}-time`} name={`${meal}-time`} />
            <select id={`${meal}-time-am-pm`} name={`${meal}-time-am-pm`}>
              <option value="am">AM</option>
              <option value="pm">PM</option>
            </select>
            <br />
            <br />
          </div>
        ))}

        <button
          type="submit"
          style={{ borderRadius: "10px" }}
          value="Get Personalized Diet Chart">
            Get Personalixed Deit Chart
          </button>
      </form>
    </section>
  );
};

export default PersonalizedDiet;
