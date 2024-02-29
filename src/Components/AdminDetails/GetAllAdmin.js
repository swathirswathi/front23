import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllAdmin() {
    var [admins, setAdmins] = useState([{
        "adminId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0
    }])

    useEffect(() => {
        const fetchAdmins = async () => {
            try { 
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/Admin/admin/GetAllAdmin",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setAdmins(response.data);
         }catch (error) {
                console.error('Error fetching admins:', error);
            }
        };
        fetchAdmins();
    }, []); 

    const checkIfAdmin = () => {
        const role = localStorage.getItem('role');
        return role === 'admin';
    };

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Admin Details</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    {admins.map((admin) =>
                        <div key={admin.adminId}>
                            <div class="box">
                                <h4>AdminId:{admin.adminId}</h4>
                                <h6>FirstName:{admin.firstName}</h6>
                                <h6>LastName:{admin.lastName}</h6>
                                <h6>Email:{admin.email}</h6>
                                <h6>UserName:{admin.username}</h6>
                                <h6>Password:{admin.password}</h6>
                                <h6>PhoneNumber:{admin.phoneNumber}</h6> 
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllAdmin;
