import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllReservation() {
    var [reservations, setUsers] = useState([{
        "reservationId":0,
        "pickUpDateTime": 0,
        "dropOffDateTime":0,
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
                        <div key={reservation.reservationId}>
                            <div class="box">
                                <h4>ReservationId:{reservation.reservationId}</h4>
                                <h6>PickUpDateTime:{reservation.pickUpDateTime}</h6>
                                <h6>DropOffDateTime:{reservation.dropOffDateTime}</h6>
                                <h6>Status:{reservation.status}</h6>
                                <h6>PickUpStoreLocation:{reservation.pickUpStoreLocation}</h6>
                                <h6>DropOffStoreLocation:{reservation.dropOffStoreLocation}</h6>
                                <h6>TotalPrice:{reservation.totalPrice}</h6> 
                                <h6>PaymentId:{reservation.paymentId}</h6> 
                                <h6>UserId:{reservation.userId}</h6> 
                                <h6>CarId:{reservation.carId}</h6> 
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllReservation;
