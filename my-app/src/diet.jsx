import React from "react";


const NutrientBreakdown = () => {
  return (
    <>
      <h1>My Nutrient Breakdown</h1>
      <p>
        Here’s a summary of your daily nutritional needs based on your weight,
        activity level, and kidney health. This breakdown will help guide you
        in achieving the right balance for a kidney-friendly diet.
      </p>

      <section id="total-calories">
        <h2>Total Calories (Energy)</h2>
        <p>
          Your recommended daily energy intake is approximately{" "}
          <span id="calories">2200</span> kcal.
        </p>
        <div className="progress-bar">
          <div className="progress" id="calories-progress"></div>
        </div>
        <span className="tooltip">
          (i)
          <span className="tooltip-text">
            Calories are calculated using your Adjusted Body Weight (ABW) and
            your activity level (Sedentary, Mildly Active, Moderately Active,
            Very Active).
          </span>
        </span>
      </section>

      <section id="protein">
        <h2>Protein Requirement</h2>
        <p>
          Your recommended daily protein intake is{" "}
          <span id="protein">60</span> g/day.
        </p>
        <div className="progress-bar">
          <div className="progress" id="protein-progress"></div>
        </div>
        <span className="tooltip">
          (i)
          <span className="tooltip-text">
            Protein intake is calculated based on your kidney health condition
            (CKD, Dialysis, or Transplant). A supervised diet plan is
            recommended to monitor protein levels closely.
          </span>
        </span>
      </section>

      <section id="fat">
        <h2>Fat Intake</h2>
        <p>
          Your recommended daily fat intake is approximately{" "}
          <span id="fat">73</span> g/day.
        </p>
        <div className="pie-chart" id="fat-chart"></div>
        <span className="tooltip">
          (i)
          <span className="tooltip-text">
            Fat intake is calculated as 30% of your total daily calories.
            Unsaturated fats support kidney and heart health, while saturated
            fats should be limited.
          </span>
        </span>
      </section>

      <section id="carbohydrates">
        <h2>Carbohydrate Intake</h2>
        <p>
          Your recommended daily carbohydrate intake is approximately{" "}
          <span id="carbs">250</span> g/day.
        </p>
        <div className="progress-bar">
          <div className="progress" id="carbs-progress"></div>
        </div>
        <span className="tooltip">
          (i)
          <span className="tooltip-text">
            Carbohydrates should come from complex carbs like whole grains,
            vegetables, and legumes. This helps provide steady energy and
            supports kidney health.
          </span>
        </span>
      </section>

      <section id="micronutrients">
        <h2>Micronutrient Requirements</h2>
        <p>
          Your recommended daily potassium intake is approximately{" "}
          <span id="potassium">2000</span> mg.
        </p>
        <p>
          Your recommended daily phosphorus intake is approximately{" "}
          <span id="phosphorus">1200</span> mg.
        </p>
        <span className="tooltip">
          (i)
          <span className="tooltip-text">
            Potassium and phosphorus intake need to be carefully managed. Too
            much can strain your kidneys, so understanding and moderation is
            key.
          </span>
        </span>
      </section>
    </>
  );
};

export default NutrientBreakdown;
