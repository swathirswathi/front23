import React, { useState } from 'react';
import axios from 'axios';

function GetReservationByUsername() {
    const [reservations, setReservations] = useState([]);
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const fetchPaymentDetailsByUsername = async () => {
        try {
            const token = localStorage.getItem('token');
            const userResponse = await axios.get(`http://localhost:5260/api/User/user/GetUser/get/${username}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const userId = userResponse.data.userId;

           
            const paymentResponse = await axios.get(`http://localhost:5260/api/Reservation/user/Admin/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReservations(paymentResponse.data);
        } catch (error) {
            setError('Error fetching reservation details');
        }
    };

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>Reservation Details By UserName</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container">
                    <input
                        type="text"
                        placeholder="Enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button onClick={fetchPaymentDetailsByUsername}>Submit</button>
                    {reservations.length > 0 && (
                        <div>
                            {reservations.map(reservation => (
                                <div key={reservation.reservationId} className="box">
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
                            ))}
                        </div>
                    )}
                    {reservations.length === 0 && <p>No reservation details found</p>}
                    {error && <p>{error}</p>}
                </div>
            </section>
        </div>
    );
}

export default GetReservationByUsername;
