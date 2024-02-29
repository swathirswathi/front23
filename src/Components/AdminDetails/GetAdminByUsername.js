import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAdminById() {
    var [admin, setAdmins] = useState({
        "adminId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
    })

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
    }

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Admin Details By Username</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Username" />
                <button onClick={fetchAdminByUsername} className='btn btn-primary'>Submit</button>
                {admin.adminId !== 0 && 
                        <div className="box">
                            <h4>AdminId: {admin.adminId}</h4>
                            <h6>FirstName: {admin.firstName}</h6>
                            <h6>LastName: {admin.lastName}</h6>
                            <h6>Email: {admin.email}</h6>
                            <h6>UserName: {admin.username}</h6>
                            <h6>Password: {admin.password}</h6>
                            <h6>PhoneNumber: {admin.phoneNumber}</h6>
                        </div>
                    }
                </div>
                    
            </section>
        </div>
    );
}

export default GetAdminById;
