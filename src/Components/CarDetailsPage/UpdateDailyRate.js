import React, { useState } from 'react';
import axios from 'axios';

function UpdateDailyRate() {
  const [carId, setCarId] = useState('');
  const [newDailyRate, setNewDailyRate] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleCarIdChange = (event) => {
    setCarId(event.target.value);
  };

  const handleInputChange = (event) => {
    setNewDailyRate(event.target.value);
  };

  const handleUpdateDailyRate = async () => {
    try {
      setIsUpdating(true);
      const response = await axios.put(`http://localhost:5260/api/Car/${carId}/daily-rate`, { dailyRate: newDailyRate });
      console.log('Request:', response.config); // Log the request
    console.log('Response:', response.data); // Log the response
      console.log('Daily rate updated successfully:', response.data);
      setIsUpdating(false);
    } catch (error) {
      console.error('Failed to update daily rate:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h2>Update Daily Rate</h2>
      <div>
        <label htmlFor="carId">Car ID:</label>
        <input type="text" id="carId" value={carId} onChange={handleCarIdChange} />
      </div>
      <div>
        <label htmlFor="newDailyRate">New Daily Rate:</label>
        <input type="number" id="newDailyRate" value={newDailyRate} onChange={handleInputChange} />
        <button onClick={handleUpdateDailyRate} disabled={isUpdating}>
          {isUpdating ? 'Updating...' : 'Update Daily Rate'}
        </button>
      </div>
    </div>
  );
}

export default UpdateDailyRate;
