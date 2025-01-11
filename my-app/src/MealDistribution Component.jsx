import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import axios from 'axios';
function MealDistribution({ onSubmit, onNext, onPrev }) {
  const [mealOrder, setMealOrder] = useState([
    'Breakfast', 'Lunch', 'Dinner', 'Snacks (Morning)', 'Snacks (Afternoon)', 'Snacks (Evening)',
  ]);
  const [errorMessage, setErrorMessage] = useState('');
  const [, drop] = useDrop(() => ({
    accept: 'meal',
    drop: (item) => {
      const newOrder = [...mealOrder];
      const index = newOrder.indexOf(item.name);
      if (index !== -1) {
        newOrder.splice(index, 1);
        newOrder.push(item.name);
      }
      setMealOrder(newOrder);
    },
  }));

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/meal-info', { mealOrder });
      console.log('Meal order submitted:', response.data);

      // Call parent callback
      onSubmit({ mealOrder });
      onNext();
    } catch (error) {
      console.error('Error submitting meal order:', error);
      setErrorMessage('Failed to submit meal order. Please try again.');
    }
  };


  return (
    <div ref={drop}>
      <h2>Meal Distribution</h2>
      <p>Drag and drop to order your meals/snacks as per your typical eating schedule.</p>
      <div className="meal-list">
        {mealOrder.map((meal, index) => (
          <div key={index} className="meal-item" draggable>
            {meal}
          </div>
        ))}
      </div>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button onClick={onPrev}>Back</button>
      <button onClick={handleSubmit}>Next</button>
    </div>
  );
}

export default MealDistribution;
