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
                    {payments.length > 0 && (
                        <div>
                            {payments.map(payment => (
                                <div key={payment.paymentId} className="box">
                                    <h4>PaymentId: {payment.paymentId}</h4>
                                    <h6>PaymentMethod: {payment.paymentMethod}</h6>
                                    <h6>PaymentAmount: {payment.paymentAmount}</h6>
                                    <h6>PaymentStatus: {payment.paymentStatus}</h6>
                                    <h6>TransactionId: {payment.transactionId}</h6>
                                    <h6>TransactionDate: {payment.transactionDate}</h6>
                                    <h6>ReservationId: {payment.reservationId}</h6>
                                    <h6>UserId: {payment.userId}</h6>
                                    <h6>CarId: {payment.carId}</h6>
                                </div>
                            ))}
                        </div>
                    )}
                    {payments.length === 0 && <p>No payment details found</p>}
                    {error && <p>{error}</p>}
                </div>
            </section>
        </div>
    );
}

export default GetPaymentByUsername;
