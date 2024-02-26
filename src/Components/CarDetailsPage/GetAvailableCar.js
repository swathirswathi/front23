import React, { useEffect, useState } from 'react';


function GetAvailableCar() {
    var [cars, setCars] = useState([{
        "carId": 0,
        "make": "0",
        "model": "0",
        "year": "0",
        "availability": 0,
        "dailyRate": "0",
        "imageURL": "0",
        "specification":"0"
    }])

    useEffect(() => {
        fetch("http://localhost:5260/api/Car/admin/Cars/Availability")
            .then(res => res.json()) //converting to json//success
            .then(res => {
                setCars(res);
            }, [])
            .catch(err => console.log(err));//error
    })

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Available Details</h3>
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

export default GetAvailableCar;
