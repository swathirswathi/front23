import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllCar() {
    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": false,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    }])

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get("http://localhost:5260/api/Car/admin/cars/GetCarsList", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            setCars(response.data);
        })
        .catch(error => {
            console.error('Error fetching cars:', error);
        });
    }, []);

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Car Details</h3>
            </div>
            <section className="services" id="services">
    <div className="services-container">
        {cars.map((car) =>
            <div key={car.carId} className="card">
                <div className="card-body">
                <img className="card-img-top" src={car.imageURL} alt="Car" />
                    <h4 className="card-title">CarId: {car.carId}</h4>
                    <p className="card-text">Make: {car.make}</p>
                    <p className="card-text">Model: {car.model}</p>
                    <p className="card-text">Year: {car.year}</p>
                    <p className="card-text">Availability: {car.availability ? "Available" : "Not Available"}</p>
                    <p className="card-text">DailyRate: {car.dailyRate}</p>
                    <p className="card-text">Specification: {car.specification}</p>
                </div>
            </div>
        )}
    </div>
</section>

        </div>
    );
}

export default GetAllCar;
