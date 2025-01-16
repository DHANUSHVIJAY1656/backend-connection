import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

function LabResultsForm() {
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => setFiles(acceptedFiles),
    accept: '.pdf, .doc, .docx, .jpg, .png',
  });

  const handleChange = (e) => {
    setLabResults({ ...labResults, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    Object.entries(labResults).forEach(([key, value]) => formData.append(key, value));
    files.forEach((file) => formData.append('reports', file));

    console.log('Submitting FormData:');
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/lab-results', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert('Lab results submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting lab results:', error);
      setErrorMessage('Failed to submit lab results. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        required
      />

      <label>Serum Creatinine:</label>
      <input
        type="number"
        name="creatinine"
        value={labResults.creatinine}
        onChange={handleChange}
        required
      />

      <label>Potassium:</label>
      <input
        type="number"
        name="potassium"
        value={labResults.potassium}
        onChange={handleChange}
        required
      />

      <label>Phosphorus:</label>
      <input
        type="number"
        name="phosphorus"
        value={labResults.phosphorus}
        onChange={handleChange}
        required
      />

      <label>iPTH:</label>
      <input
        type="number"
        name="ipth"
        value={labResults.ipth}
        onChange={handleChange}
        required
      />

      <label>25-OH Vitamin D:</label>
      <input
        type="number"
        name="vitaminD"
        value={labResults.vitaminD}
        onChange={handleChange}
        required
      />

      <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '10px', marginTop: '10px' }}>
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>

      <ul>
        {files.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default LabResultsForm;
