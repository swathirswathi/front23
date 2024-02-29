import React, { useState } from 'react';
import "../../Components/AdminDetails/DeleteAdmin.css";
import axios from "axios";

function DeleteUser() {
    const [adminIdInput, setAdminIdInput] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleDeleteAdmin = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.delete(`http://localhost:5260/api/User/admin/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                if (response.status === 200) {
                    setMessage('User deleted successfully.');
                    setAdminIdInput('');
                } else {
                    setMessage('Failed to delete user. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting user:', error);
                setMessage('An error occurred. Please try again later.');
            });
        } else {
            setMessage('Please enter a valid user ID.');
        }
    };

    return (
        <div className="delete-admin-container">
            <h3>Delete User</h3>
            <div>
                <label>User ID: </label>
                <input type="text" value={adminIdInput} onChange={handleInputChange} />
            </div>
            <button onClick={handleDeleteAdmin}>Delete User</button>
            {message && <div>{message}</div>}
        </div>
    );
}

export default DeleteUser;
