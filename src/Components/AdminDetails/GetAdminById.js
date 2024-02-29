import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

    const fetchAdminById = () => {
        const token = localStorage.getItem('token');
        const id = adminIdInput.trim();
        if (id) {
            axios.get(`http://localhost:5260/api/Admin/admin/admins/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(res => {
                    setAdmins(res.data); // Set admins with res.data, not res
                })
                .catch(err => console.log(err)); //error
        } else {
            console.error("Please enter a valid admin ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Admin Details By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Admin ID" />
                <button onClick={fetchAdminById} className='btn btn-primary'>Submit</button>
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
