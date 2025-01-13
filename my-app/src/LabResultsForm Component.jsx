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
  const [isSubmitting, setIsSubmitting] = useState(false);

  // useDropzone hook for handling file uploads
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
    accept: '.pdf, .doc, .docx, .jpg, .png', // Only allow specific file types
  });

  const handleChange = (e) => {
    setLabResults({ ...labResults, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Disable the form while submitting

    const formData = new FormData();
    Object.entries(labResults).forEach(([key, value]) => {
      formData.append(key, value);
    });

    // Append files to FormData
    files.forEach((file) => {
      formData.append('reports', file);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/lab-results', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Tell axios to send multipart data
        },
      });

      if (response.status === 200) {
        // If submission is successful, call the onSubmit and onNext functions
        onSubmit({ labResults, files });
        onNext();
      }
    } catch (error) {
      console.error('Error submitting lab results:', error);
      setErrorMessage('Failed to submit lab results. Please try again.');
    } finally {
      setIsSubmitting(false); // Enable the form again after submission attempt
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Lab Results</h2>
      
      <label>Hemoglobin:</label>
      <input
        type="number"
        name="hemoglobin"
        value={labResults.hemoglobin}
        onChange={handleChange}
      />

      <label>Serum Creatinine:</label>
      <input
        type="number"
        name="creatinine"
        value={labResults.creatinine}
        onChange={handleChange}
      />

      <label>Potassium:</label>
      <input
        type="number"
        name="potassium"
        value={labResults.potassium}
        onChange={handleChange}
      />

      <label>Phosphorus:</label>
      <input
        type="number"
        name="phosphorus"
        value={labResults.phosphorus}
        onChange={handleChange}
      />

      <label>iPTH:</label>
      <input
        type="number"
        name="ipth"
        value={labResults.ipth}
        onChange={handleChange}
      />

      <label>25-OH Vitamin D:</label>
      <input
        type="number"
        name="vitaminD"
        value={labResults.vitaminD}
        onChange={handleChange}
      />

      {/* Dropzone section for file upload */}
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button type="button">Upload Medical Reports</button>
      </div>
      
      {/* Display uploaded files */}
      <div>
        {files.length > 0 && (
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Display error message if any */}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="button" onClick={onPrev} disabled={isSubmitting}>
        Back
      </button>
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Next'}
      </button>
    </form>
  );
}

export default LabResultsForm;
