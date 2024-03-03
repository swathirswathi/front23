import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllReservation() {
    var [reservations, setUsers] = useState([{
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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/Reservation/admin/All",
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
                <h3>All Reservation Details</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    {reservations.map((reservation) =>
                        <div key={reservation.reservationId} className="card">
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
                    )}
                </div>
            </section>

        </div>
    );
}

export default GetAllReservation;
