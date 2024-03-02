import React, { useState } from 'react';
import "../../Components/AdminDetails/DeleteAdmin.css";
import axios from "axios";

function DeleteCar() {
    const [carIdInput, setCarIdInput] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setCarIdInput(e.target.value);
    };

    const handleDeleteCar = () => {
        const id = carIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            const confirmDelete = window.confirm("Are you sure you want to delete this car?");
            if (confirmDelete) {
                axios.delete(`http://localhost:5260/api/Car/admin/cars/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    if (response.status === 200) {
                        setMessage('Car deleted successfully.');
                        setCarIdInput('');
                    } else {
                        setMessage('Failed to delete car. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('Error deleting car:', error);
                    setMessage('An error occurred. Please try again later.');
                });
            } else {
                setMessage('Deletion canceled.');
            }
        } else {
            setMessage('Please enter a valid car ID.');
        }
    };

    return (
        <div className="delete-admin-container">
            <h3>Delete Car</h3>
            <div>
                <label>Car ID: </label>
                <input type="text" value={carIdInput} onChange={handleInputChange} />
            </div>
            <button onClick={handleDeleteCar}>Delete Car</button>
            {message && <div>{message}</div>}
        </div>
    );
}

export default DeleteCar;
