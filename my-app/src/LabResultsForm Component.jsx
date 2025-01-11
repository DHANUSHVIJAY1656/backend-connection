import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
function LabResultsForm({ onSubmit, onNext, onPrev }) {
  const [labResults, setLabResults] = useState({
    hemoglobin: '',
    creatinine: '',
    potassium: '',
    phosphorus: '',
    ipth: '',
    vitaminD: '',
  });

  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
      console.log(acceptedFiles);
      // Handle file upload
    },
  });

  const handleChange = (e) => {
    setLabResults({ ...labResults, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    const formData = new FormData();
    Object.entries(labResults).forEach(([key, value]) => {
      formData.append(key, value);
    });
    files.forEach((file) => {
      formData.append('reports', file);
    });

    try {
     
      const response = await axios.post('http://localhost:5000/api/lab-results', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      console.log('Response from backend:', response.data);

      
      onSubmit({ labResults, files });
      onNext();
    } catch (error) {
      console.error('Error submitting lab results:', error);
      setErrorMessage('Failed to submit lab results. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Lab Results</h2>
      <label>Hemoglobin:</label>
      <input type="number" name="hemoglobin" value={labResults.hemoglobin} onChange={handleChange} />

      <label>Serum Creatinine:</label>
      <input type="number" name="creatinine" value={labResults.creatinine} onChange={handleChange} />

      <label>Potassium:</label>
      <input type="number" name="potassium" value={labResults.potassium} onChange={handleChange} />

      <label>Phosphorus:</label>
      <input type="number" name="phosphorus" value={labResults.phosphorus} onChange={handleChange} />

      <label>iPTH:</label>
      <input type="number" name="ipth" value={labResults.ipth} onChange={handleChange} />

      <label>25-OH Vitamin D:</label>
      <input type="number" name="vitaminD" value={labResults.vitaminD} onChange={handleChange} />

      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type="button">Upload Medical Reports</button>
      </div>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={onPrev}>Back</button>
      <button type="submit">Next</button>
    </form>
  );
}

export default LabResultsForm;
