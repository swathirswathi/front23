import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllUser() {
    var [users, setUsers] = useState([{
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate": "0"
    }])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/User/admin/GetUser",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All User Details</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    {users.map((user) =>
                        <div key={user.userId} className="card">
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
                </div>
            </section>

        </div>
    );
}

export default GetAllUser;
