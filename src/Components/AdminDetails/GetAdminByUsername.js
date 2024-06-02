import React, { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported

function GetAdminById() {
    var [admin, setAdmins] = useState({
        "adminId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
    });

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchAdminByUsername = () => {
        const token = localStorage.getItem('token');
        const username = adminIdInput.trim();
        if (username) {
            axios.get(`http://localhost:5260/api/Admin/admin/admins/get/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => {
                    setAdmins(res.data); // Set the admin state with the response data
                })
                .catch(err => console.error(err)); // Log the error
        } else {
            console.error("Please enter a valid username");
        }
    };

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>Admin Details By Username</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '300px', margin: '20px', textAlign: 'center' }}>
                        <input
                            type="text"
                            value={adminIdInput}
                            onChange={handleInputChange}
                            placeholder="Enter Username"
                            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
                        />
                        <button onClick={fetchAdminByUsername} className='btn btn-primary' style={{ width: '100%' }}>Submit</button>
                    </div>
                    {admin.adminId !== 0 &&
                        <div className="card" style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
                            <div className="card-body">
                                <h4 className="card-title">AdminId: {admin.adminId}</h4>
                                <p className="card-text">FirstName: {admin.firstName}</p>
                                <p className="card-text">LastName: {admin.lastName}</p>
                                <p className="card-text">Email: {admin.email}</p>
                                <p className="card-text">UserName: {admin.username}</p>
                                <p className="card-text">Password: {admin.password}</p>
                                <p className="card-text">PhoneNumber: {admin.phoneNumber}</p>
                            </div>
                        </div>
                    }
                </div>
            </section>
        </div>
    );
}

export default GetAdminById;
