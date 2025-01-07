import React, { useState } from "react";
import axios from "axios";

const UploadReports = () => {
  const [formData, setFormData] = useState({
    hemoglobin: "",
    serumCreatinine: "",
    egfr: "",
    potassium: "",
    phosphorus: "",
    ipth: "",
    vitaminD: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const calculateGFR = () => {
    const serumCreatinine = parseFloat(formData.serumCreatinine);
    if (!serumCreatinine || serumCreatinine <= 0) {
      alert("Please enter a valid Serum Creatinine value to calculate GFR.");
      return;
    }
    // Example GFR calculation logic, replace with actual formula if needed.
    const egfr = (140 - 30) / serumCreatinine; 
    setFormData((prevData) => ({
      ...prevData,
      egfr: egfr.toFixed(2),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/dietupload', formData);

      console.log("Submitted Data:", response.data);
      
      // If the submission is successful
      alert("Lab Results Submitted Successfully!");
    } catch (error) {
      // Handle any errors that occur during the submission process
      console.error("Error submitting lab results:", error);
      alert("There was an error submitting the lab results. Please try again.");
    }
  };
  

  // Validate form - ensure all fields except the file are filled
  // const isFormValid = Object.values(formData).every(
  //   (value) => value !== "" && value !== null && value !== undefined
  // );

  return (
    <section id="upload-reports">
      <h2>Upload Your Reports or Enter Lab Results</h2>
      <p>Let's Review Your Reports for a More Personalized Diet Plan!</p>
      <p>
        Your kidney health is influenced by several factors, and understanding
        your lab results is key to getting the right care. In this step, we’ll
        ask you to either upload your reports or enter important test results to
        help us create a diet plan that works best for you.
      </p>
      <p>
        If you don't have your reports handy, don't worry. You can consult your
        doctor or download them online, or if you're unsure, simply proceed with
        the fields provided.
      </p>

      <h3>Option 1: Upload Your Reports</h3>
      <label htmlFor="report-upload">Upload Your Reports:</label>
      <input
        type="file"
        id="report-upload"
        name="report-upload"
        onChange={handleFileChange}
      />
      <br />
      <br />
      <p>
        Please upload reports containing the following test results: Hemoglobin
        (Hb), Serum Creatinine, Potassium, Phosphorus, iPTH, and 25-OH Vitamin
        D. This will help us accurately assess your kidney health and tailor
        your diet accordingly.
      </p>
      <p>
        Note: Your reports will be reviewed by our dieticians to ensure the
        best possible recommendations.
      </p>

      <h3>Option 2: Enter Your Lab Results Manually</h3>
      <form id="lab-results-form" onSubmit={handleSubmit}>
        <label htmlFor="hemoglobin">Hemoglobin (Hb):</label>
        <input
          type="number"
          id="hemoglobin"
          name="hemoglobin"
          step="0.1"
          value={formData.hemoglobin}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="serum-creatinine">Serum Creatinine:</label>
        <input
          type="number"
          id="serum-creatinine"
          name="serumCreatinine"
          step="0.1"
          value={formData.serumCreatinine}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="egfr">Estimated GFR (eGFR):</label>
        <input
          type="text"
          id="egfr"
          name="egfr"
          value={formData.egfr}
          readOnly
        />
        <button
          type="button"
          style={{ borderRadius: "10px", marginLeft: "10px" }}
          onClick={calculateGFR}
        >
          Calculate GFR
        </button>
        <br />
        <br />
        <label htmlFor="potassium">Potassium:</label>
        <input
          type="number"
          id="potassium"
          name="potassium"
          step="0.1"
          value={formData.potassium}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="phosphorus">Phosphorus:</label>
        <input
          type="number"
          id="phosphorus"
          name="phosphorus"
          step="0.1"
          value={formData.phosphorus}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="ipth">Intact Parathyroid Hormone (iPTH):</label>
        <input
          type="number"
          id="ipth"
          name="ipth"
          step="1"
          value={formData.ipth}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <label htmlFor="vitamin-d">25-OH Vitamin D:</label>
        <input
          type="number"
          id="vitamin-d"
          name="vitaminD"
          step="1"
          value={formData.vitaminD}
          onChange={handleInputChange}
        />
        <br />
        <br />
        <button type="submit" >
          Submit Lab Results
        </button>
      </form>
    </section>
  );
};

export default UploadReports;
