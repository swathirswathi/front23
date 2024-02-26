import React, { useState } from 'react';
import "./DeleteAdmin.css";

function DeleteAdmin() {
    const [adminIdInput, setAdminIdInput] = useState('');
    const [message, setMessage] = useState('');

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleDeleteAdmin = () => {
        const id = adminIdInput.trim();
        if (id) {
            fetch(`http://localhost:5260/api/Admin/admin/admins/del/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    setMessage('Admin deleted successfully.');
                    setAdminIdInput('');
                } else {
                    setMessage('Failed to delete admin. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error deleting admin:', error);
                setMessage('An error occurred. Please try again later.');
            });
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
