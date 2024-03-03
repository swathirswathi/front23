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
            } catch (error) {
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
                <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {admins.map((admin) =>
                        <div key={admin.adminId} style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            <div style={{ padding: '16px' }}>
                                <h4 style={{ margin: '8px 0' }}>AdminId: {admin.adminId}</h4>
                                <h6 style={{ margin: '8px 0' }}>FirstName: {admin.firstName}</h6>
                                <h6 style={{ margin: '8px 0' }}>LastName: {admin.lastName}</h6>
                                <h6 style={{ margin: '8px 0' }}>Email: {admin.email}</h6>
                                <h6 style={{ margin: '8px 0' }}>UserName: {admin.username}</h6>
                                <h6 style={{ margin: '8px 0' }}>Password: {admin.password}</h6>
                                <h6 style={{ margin: '8px 0' }}>PhoneNumber: {admin.phoneNumber}</h6>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllAdmin;
