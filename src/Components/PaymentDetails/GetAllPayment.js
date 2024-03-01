import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllPayment() {
    var [payments, setPayments] = useState([{
        "paymentId":0,
        "paymentMethod": "0",
        "paymentAmount": 0,
        "paymentStatus": "Paid",
        "transactionId": 0,
        "transactionDate": 0,
        "reservationId": 0,
        "userId": 0, 
        "carId":0
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
         }catch (error) {
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
                <div className="services-container">
                    {payments.map((payment) =>
                        <div key={payment.paymentId}>
                            <div class="box">
                                <h4>PaymentId:{payment.paymentId}</h4>
                                <h6>PaymentMethod:{payment.paymentMethod}</h6>
                                <h6>PaymentAmount:{payment.paymentAmount}</h6>
                                <h6>PaymentStatus:{payment.paymentStatus}</h6>
                                <h6>TransactionId:{payment.transactionId}</h6>
                                <h6>TransactionDate:{payment.transactionDate}</h6>
                                <h6>ReservationId:{payment.reservationId}</h6> 
                                <h6>UserId:{payment.userId}</h6> 
                                <h6>CarId:{payment.carId}</h6> 
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default GetAllPayment;
