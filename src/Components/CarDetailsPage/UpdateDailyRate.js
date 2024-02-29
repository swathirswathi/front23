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
      const authToken = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:5260/api/Car/${carId}/daily-rate`, 
        { dailyRate: newDailyRate, carId: carId }, // Request body
        {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        }
      );
      alert('Daily rate updated successfully')
      console.log('Daily rate updated successfully:', response.data);
      setIsUpdating(false);
    } catch (error) {
      alert('Failed to update daily rate')
      console.error('Failed to update daily rate:', error);
      setIsUpdating(false);
    }
  };

  return (
    <div>
      <h2>Update Daily Rate</h2>
      <div>
        <label htmlFor="carId">Car ID:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <input type="text" id="carId" value={carId} onChange={handleCarIdChange} />
      </div>
      <br />
      <div>
        <label htmlFor="newDailyRate">New Daily Rate:&nbsp;</label>
        <input type="number" id="newDailyRate" value={newDailyRate} onChange={handleInputChange} />
        <br />
        <br />
        <button className="btn btn-primary w-60" onClick={handleUpdateDailyRate} disabled={isUpdating}>
        {isUpdating ? 'Updating...' : 'Update Daily Rate'}
        </button>
      </div>
    </div>
  );
}

export default UpdateDailyRate;
