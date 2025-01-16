import React from 'react';
import { Tooltip } from 'react-tooltip';

const DietRecommendation = ({ condition }) => {
  const recommendations = {
    CKD: (
      <div>
        <h3>Chronic Kidney Disease (CKD)</h3>
        <p>Moderate protein intake is essential to prevent kidney strain.</p>
        <p>Phosphorus and potassium levels need monitoring.</p>
        <button data-tip data-for="ckd-tooltip">ℹ️</button>
        <Tooltip id="ckd-tooltip" place="top" effect="solid">
          Protein, phosphorus, and potassium management is crucial in CKD.
        </Tooltip>
      </div>
    ),
    Dialysis: (
      <div>
        <h3>Dialysis</h3>
        <p>Dialysis increases protein needs, typically around 1.2-1.5g per kg body weight.</p>
        <button data-tip data-for="dialysis-tooltip">ℹ️</button>
        <Tooltip id="dialysis-tooltip" place="top" effect="solid">
          Dialysis patients require higher protein and must manage fluid intake.
        </Tooltip>
      </div>
    ),
    Transplant: (
      <div>
        <h3>Transplant</h3>
        <p>Balanced nutrition is key after a transplant, with a focus on protein recovery.</p>
        <button data-tip data-for="transplant-tooltip">ℹ️</button>
        <Tooltip id="transplant-tooltip" place="top" effect="solid">
          Monitor phosphorus and potassium levels post-transplant.
        </Tooltip>
      </div>
    ),
  };

  // If no condition is provided or the condition doesn't match any key, show a default message
  const content = recommendations[condition] || (
    <div>
      <h3>No condition selected</h3>
      <p>Please select a condition to view dietary recommendations.</p>
    </div>
  );

  return <div>{content}</div>;
};

export default DietRecommendation;
