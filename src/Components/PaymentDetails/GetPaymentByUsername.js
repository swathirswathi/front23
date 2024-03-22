import React, { useState } from 'react';
import axios from 'axios';

function GetPaymentByUsername() {
    const [payments, setPayments] = useState([]);
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

            // Fetch payment details by user ID
            const paymentResponse = await axios.get(`http://localhost:5260/api/Payment/user/admin/userId/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setPayments(paymentResponse.data);
        } catch (error) {
            setError('Error fetching payment details');
        }
    };

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>Payment Details By UserName</h3>
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
                    {payments.length > 0 ? (
                        <div className="card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                            {payments.map(payment => (
                                <div key={payment.paymentId} className="card" style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
                                    <div className="card-body">
                                        <h4 className="card-title">PaymentId: {payment.paymentId}</h4>
                                        <p className="card-text">PaymentMethod: {payment.paymentMethod}</p>
                                        <p className="card-text">PaymentAmount: {payment.paymentAmount}</p>
                                        <p className="card-text">PaymentStatus: {payment.paymentStatus}</p>
                                        <p className="card-text">TransactionId: {payment.transactionId}</p>
                                        <p className="card-text">TransactionDate: {payment.transactionDate}</p>
                                        <p className="card-text">ReservationId: {payment.reservationId}</p>
                                        <p className="card-text">UserId: {payment.userId}</p>
                                        <p className="card-text">CarId: {payment.carId}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No payment details found</p>
                    )}
                    {error && <p>{error}</p>}
                </div>
            </section>


        </div>
    );
}

export default GetPaymentByUsername;
