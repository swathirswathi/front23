import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetCarById() {
    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": true,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    }])

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchCarById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Car/User/Cars/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                setCars(response.data);
            })
            .catch(error => {
                console.error('Error fetching car by ID:', error);
            });
        } else {
            console.error("Please enter a valid Car ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Car Details By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Car ID" />
                <button onClick={fetchCarById} className='btn btn-primary'>Submit</button>
                {cars.carId !== 0 && 
                        <div className="box">
                            <h4>CarId:{cars.carId}</h4>
                                <h6>Make:{cars.make}</h6>
                                <h6>Model:{cars.model}</h6>
                                <h6>Year:{cars.year}</h6>
                                <h6>Availability:{cars.availability? "Available" : "NotAvailable"}</h6>
                                <h6>DailyRate:{cars.dailyRate}</h6>
                                <h6>Image: <img className='img1' src={cars.imageURL} alt="cars" /></h6> 
                                <h6>Specification:{cars.specification}</h6> 
                        </div>
                    }
                </div>
                    
            </section>
        </div>
    );
}

export default GetCarById;
