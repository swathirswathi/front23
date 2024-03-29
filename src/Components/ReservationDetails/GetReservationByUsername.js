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
                    <div style={{ marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{ marginRight: '10px', padding: '5px' }}
                        />
                        <button onClick={fetchPaymentDetailsByUsername} className='btn btn-primary'>Submit</button>
                    </div>
                    {reservations.length > 0 ? (
                        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                            {reservations.map(reservation => (
                                <div key={reservation.reservationId} className="card" style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
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
                            ))}
                        </div>
                    ) : (
                        <p>No reservation details found</p>
                    )}
                    {error && <p>{error}</p>}
                </div>
            </section>


        </div>
    );
}

export default GetReservationByUsername;
