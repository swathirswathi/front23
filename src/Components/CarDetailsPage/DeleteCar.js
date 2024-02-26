import React, { useState } from 'react';
import "../../Components/AdminDetails/DeleteAdmin.css";

function DeleteCar() {
    const [adminIdInput, setAdminIdInput] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleDeleteAdmin = () => {
        const id = adminIdInput.trim();
        if (id) {
            fetch(`http://localhost:5260/api/Car/admin/cars/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    setMessage('Car deleted successfully.');
                    setAdminIdInput('');
                } else {
                    setMessage('Failed to delete car. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting admin:', error);
                setMessage('An error occurred. Please try again later.');
            });
        } else {
            setMessage('Please enter a valid car ID.');
        }
    };

    return (
        <div className="delete-admin-container">
            <h3>Delete Car</h3>
            <div>
                <label>Car ID: </label>
                <input type="text" value={adminIdInput} onChange={handleInputChange} />
            </div>
            <button onClick={handleDeleteAdmin}>Delete Car</button>
            {message && <div>{message}</div>}
        </div>
    );
}

export default DeleteCar;
