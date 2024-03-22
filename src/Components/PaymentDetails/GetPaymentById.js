import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetPaymentById() {
    var [payment, setPayments] = useState([{
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

    const [adminIdInput, setAdminIdInput] = useState("");

    const handleInputChange = (e) => {
        setAdminIdInput(e.target.value);
    };

    const fetchPaymentById = () => {
        const id = adminIdInput.trim();
        if (id) {
            const token = localStorage.getItem('token');
            axios.get(`http://localhost:5260/api/Payment/user/payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(response => {
                    setPayments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching Payment by ID:', error);
                });
        } else {
            console.error("Please enter a valid Payment ID");
        }
    };

    return (
        <div className='all-div'>

            <div className="heading">
                <h3>Payment Details By Id</h3>
            </div>
            <section className="services" id="services">
                <div className="services-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ width: '300px', textAlign: 'center' }}>
                        <input type="text" value={adminIdInput} onChange={handleInputChange} placeholder="Enter Payment ID" style={{ marginBottom: '10px', padding: '5px' }} />
                        <button onClick={fetchPaymentById} className='btn btn-primary' style={{ marginBottom: '10px' }}>Submit</button>
                        {payment.paymentId !== 0 &&
                            <div className="card" style={{ border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', transition: 'transform 0.2s ease-in-out' }}>
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
                        }
                    </div>
                </div>
            </section>


        </div>
    );
}

export default GetPaymentById;
