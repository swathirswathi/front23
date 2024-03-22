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
                .catch(err => alert("Please enter a valid admin ID")); //error
        } else {
            alert("Please enter a valid admin ID");

        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Admin Details By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    <div style={{ width: '300px', margin: '20px' }}>
                        <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Admin ID" style={{ marginBottom: '10px', padding: '5px' }} />
                        <button onClick={fetchAdminById} className='btn btn-primary'>Submit</button>
                    </div>
                    {admin.adminId !== 0 &&
                        <div style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
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
                    }
                </div>
            </section>

        </div>
    );
}

export default GetAdminById;
