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
        "specification": "0"
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
                        <div className="card">
                            <div className="card-body">
                            <img className="card-img-top" src={cars.imageURL} alt="Car" />
                                <h4 className="card-title">CarId: {cars.carId}</h4>
                                <p className="card-text">Make: {cars.make}</p>
                                <p className="card-text">Model: {cars.model}</p>
                                <p className="card-text">Year: {cars.year}</p>
                                <p className="card-text">Availability: {cars.availability ? "Available" : "Not Available"}</p>
                                <p className="card-text">DailyRate: {cars.dailyRate}</p>
                                <p className="card-text">Specification: {cars.specification}</p>
                            </div>
                        </div>
                    }
                </div>
            </section>

        </div>
    );
}

export default GetCarById;
