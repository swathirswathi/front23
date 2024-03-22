import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetUserById() {
    var [user, setUsers] = useState([{
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate": "0"
    }])

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleFetchUserById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/User/user/GetUser/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setUsers(response.data);
                })
                .catch(error => {
                    console.error('Error fetching user by ID:', error);
                });
        } else {
            console.error("Please enter a valid user ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>UserDetails By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container" style={{ display: 'flex', alignItems: 'center' }}>
                    <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter User ID" style={{ marginRight: '10px' }} />
                    <button onClick={handleFetchUserById} className='btn btn-primary'>Submit</button>
                </div>
                {user.userId !== 0 && (
                    <div className="card" style={{ marginTop: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="card-body">
                            <h4 className="card-title">UserId: {user.userId}</h4>
                            <p className="card-text">FirstName: {user.firstName}</p>
                            <p className="card-text">LastName: {user.lastName}</p>
                            <p className="card-text">Email: {user.email}</p>
                            <p className="card-text">UserName: {user.username}</p>
                            <p className="card-text">Password: {user.password}</p>
                            <p className="card-text">PhoneNumber: {user.phoneNumber}</p>
                            <p className="card-text">RegistrationDate: {user.registrationDate}</p>
                        </div>
                    </div>
                )}
            </section>


        </div>
    );
}

export default GetUserById;
