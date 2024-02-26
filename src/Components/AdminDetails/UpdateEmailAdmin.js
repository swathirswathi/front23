import React, { useState } from 'react';
import axios from 'axios';

function UpdateEmail({adminId}) {
    const [email, setEmail] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [isUpdating, setIsUpdating] = useState(false);

    const handleInputChange = (event) => {
        setNewEmail(event.target.value);
    };

    const handleUpdateEmail = async () => {
        try {
            const response = await axios.put(`http://localhost:5260/api/Admin/${adminId}/update-email`, { email: newEmail });
            const updatedAdmin = response.data;
            setEmail(updatedAdmin.email);
            setNewEmail('');
            setIsUpdating(false);
        } catch (error) {
            console.error('Error updating email:', error);
           
        }
    };

    return (
        <div>
            <h2>Update Admin Email</h2>
            <p>Current Email: {email}</p>
            {isUpdating ? (
                <div>
                    <input type="email" value={newEmail} onChange={handleInputChange} />
                    <button onClick={handleUpdateEmail}>Update Email</button>
                </div>
            ) : (
                <button onClick={() => setIsUpdating(true)}>Update Email</button>
            )}
        </div>
    );
}

export default UpdateEmail;