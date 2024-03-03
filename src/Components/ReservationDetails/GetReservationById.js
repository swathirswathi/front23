import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetReservationById() {
    var [reservation, setReservations] = useState([{
        "reservationId": 0,
        "pickUpDateTime": 0,
        "dropOffDateTime": 0,
        "status": "Booked",
        "pickUpStoreLocation": "0",
        "dropOffStoreLocation": "0",
        "totalPrice": "0",
        "paymentId": 0,
        "userId": 0,
        "carId": 0
    }])

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchReservationById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Reservation/user/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setReservations(response.data);
                })
                .catch(error => {
                    alert("Please enter a valid Reservation ID");
                });
        } else {
            alert("Please enter a valid Reservation ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Reservation Details By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Reservation ID" />
                    <button onClick={fetchReservationById} className='btn btn-primary'>Submit</button>
                    {reservation.reservationId !== 0 &&
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">ReservationId: {reservation.reservationId}</h4>
                                <p className="card-text">PickUpDateTime: {reservation.pickUpDateTime}</p>
                                <p className="card-text">DropOffDateTime: {reservation.dropOffDateTime}</p>
                                <p className="card-text">Status: {reservation.status}</p>
                                <p className="card-text">PickUpStoreLocation: {reservation.pickUpStoreLocation}</p>
                                <p className="card-text">DropOffStoreLocation: {reservation.dropOffStoreLocation}</p>
                                <p className="card-text">TotalPrice: {reservation.totalPrice}</p>
                                <p className="card-text">PaymentId: {reservation.paymentId}</p>
                                <p className="card-text">UserId: {reservation.userId}</p>
                                <p className="card-text">CarId: {reservation.carId}</p>
                            </div>
                        </div>
                    }
                </div>
            </section>

        </div>
    );
}

export default GetReservationById;
