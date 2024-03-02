import React, { useState } from 'react';
import "./DeleteAdmin.css";
import axios from 'axios';

function DeleteAdmin() {
    const [adminIdInput, setAdminIdInput] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleDeleteAdmin = () => {
        const token = localStorage.getItem('token');
        const id = adminIdInput.trim();
        if (id) {
            const confirmDelete = window.confirm("Are you sure you want to delete this admin?");
            if (confirmDelete) {
                axios.delete(`http://localhost:5260/api/Admin/admin/admins/del/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(() => {
                    setMessage('Admin deleted successfully.');
                    setAdminIdInput('');
                })
                .catch(error => {
                    console.error('Error deleting admin:', error);
                    setMessage('Failed to delete admin. Please try again.');
                });
            } else {
                setMessage('Deletion canceled.');
            }
        } else {
            setMessage('Please enter a valid admin ID.');
        }
    };

    return (
        <div className="delete-admin-container">
            <h3>Delete Admin</h3>
            <div>
                <label>Admin ID: </label>
                <input type="text" value={adminIdInput} onChange={handleInputChange} />
            </div>
            <button onClick={handleDeleteAdmin}>Delete Admin</button>
            {message && <div>{message}</div>}
        </div>
    );
}

export default DeleteAdmin;
