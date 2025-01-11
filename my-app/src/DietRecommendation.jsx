// import React, { useState } from "react";
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
          "Protein, phosphorus, and potassium management is crucial in CKD."
        </Tooltip>
      </div>
    ),
    Dialysis: (
      <div>
        <h3>Dialysis</h3>
        <p>Dialysis increases protein needs, typically around 1.2-1.5g per kg body weight.</p>
        <button data-tip data-for="dialysis-tooltip">ℹ️</button>
        <Tooltip id="dialysis-tooltip" place="top" effect="solid">
          "Dialysis patients require higher protein and must manage fluid intake."
        </Tooltip>
      </div>
    ),
    Transplant: (
      <div>
        <h3>Transplant</h3>
        <p>Balanced nutrition is key after a transplant, with a focus on protein recovery.</p>
        <button data-tip data-for="transplant-tooltip">ℹ️</button>
        <Tooltip id="transplant-tooltip" place="top" effect="solid">
          "Monitor phosphorus and potassium levels post-transplant."
        </Tooltip>
      </div>
    ),
  };

  return (
    <div>
      {recommendations[condition]}
    </div>
  );
};

export default DietRecommendation;
