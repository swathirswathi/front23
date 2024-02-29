import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetUserByUsername() {
    var [user, setUsers] = useState([{
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate":"0"
    }])

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const handleFetchUserByUsername = () => {
        const username = adminIdInput.trim();
        if (username) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/User/user/GetUser/get/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching user by username:', error);
            });
        } else {
            console.error("Please enter a valid username");
        }
    };
    
    return (
        <div className='all-div'>

            <div className="heading">
                <h3>UserDetails By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter username" />
                <button onClick={handleFetchUserByUsername} className='btn btn-primary'>Submit</button>
                {user.userId !== 0 && 
                        <div className="box">
                            <h4>UserId:{user.userId}</h4>
                                <h6>FirstName:{user.firstName}</h6>
                                <h6>LastName:{user.lastName}</h6>
                                <h6>Email:{user.email}</h6>
                                <h6>UserName:{user.username}</h6>
                                <h6>Password:{user.password}</h6>
                                <h6>PhoneNumber:{user.phoneNumber}</h6> 
                                <h6>RegistrationDate:{user.registrationDate}</h6> 
                        </div>
                    }
                </div>
                    
            </section>
        </div>
    );
}

export default GetUserByUsername;
