
import React, { useState } from 'react';
import axios from 'axios';
function PersonalInfoForm({ onSubmit, onNext }) {
  const [personalInfo, setPersonalInfo] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/personal-info', personalInfo);
      console.log(response.data);
      onNext(); 
    } catch (error) {
      console.error('Error submitting personal info:', error);
      setErrorMessage('Failed to submit personal information. Please try again.');
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2>Personal Information and Contact Details</h2>
      <label>Full Name:</label>
      <input type="text" name="name" value={personalInfo.name} onChange={handleChange} required />
      
      <label>Phone Number:</label>
      <input type="text" name="phone" value={personalInfo.phone} onChange={handleChange} required />
      
      <label>Email Address:</label>
      <input type="email" name="email" value={personalInfo.email} onChange={handleChange} required />
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button type="submit">Next</button>
    </form>
  );
}

export default PersonalInfoForm;
