import React, { useEffect, useState } from 'react';


function GetAllUser() {
    var [users, setUsers] = useState([{
        "userId": 0,
        "firstName": "0",
        "lastName": "0",
        "email": "0",
        "username": "0",
        "password": "**********",
        "phoneNumber": 0,
        "registrationDate":"0"
    }])

    useEffect(() => {
        fetch("http://localhost:5260/api/User/admin/GetUser")
            .then(res => res.json()) //converting to json//success
            .then(res => {
                setUsers(res);
            }, [])
            .catch(err => console.log(err));//error
    })

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All User Details</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    {users.map((user) =>
                        <div key={user.userId}>
                            <div class="box">
                                <h4>UserId:{user.userId}</h4>
                                <h6>FirstName:{user.firstName}</h6>
                                <h6>LastName:{user.lastName}</h6>
                                <h6>Email:{user.email}</h6>
                                <h6>UserName:{user.username}</h6>
                                <h6>Password:{user.password}</h6>
                                <h6>PhoneNumber:{user.phoneNumber}</h6> 
                                <h6>RegistrationDate:{user.registrationDate}</h6> 
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllUser;
