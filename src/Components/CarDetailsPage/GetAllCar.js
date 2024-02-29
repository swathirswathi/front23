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
                        <div key={car.carId}>
                            <div class="box">
                                <h4>CarId:{car.carId}</h4>
                                <h6>Make:{car.make}</h6>
                                <h6>Model:{car.model}</h6>
                                <h6>Year:{car.year}</h6>
                                <h6>Availability:{car.availability? "Available" : "NotAvailable"}</h6>
                                <h6>DailyRate:{car.dailyRate}</h6>
                                <h6>Image: <img className='img1' src={car.imageURL} alt="cars" /></h6> 
                                <h6>Specification:{car.specification}</h6> 
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllCar;
