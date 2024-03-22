import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllPayment() {
    var [payments, setPayments] = useState([{
        "paymentId": 0,
        "paymentMethod": "0",
        "paymentAmount": 0,
        "paymentStatus": "Paid",
        "transactionId": 0,
        "transactionDate": 0,
        "reservationId": 0,
        "userId": 0,
        "carId": 0
    }])

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/Payment/admin/payment/history",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setPayments(response.data);
            } catch (error) {
                console.error('Error fetching payments:', error);
            }
        };
        fetchPayments();
    }, []);


    return (
        <div className='all-div'>
            <div className="heading">
                <h3>All Payment Details</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
                    {payments.map((payment) =>
                        <div key={payment.paymentId} style={{ width: '300px', margin: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
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
                    )}
                </div>
            </section>

        </div>
    );
}

export default GetAllPayment;
