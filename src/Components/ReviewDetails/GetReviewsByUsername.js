import React, { useState } from 'react';
import axios from 'axios';

function GetReservationByUsername() {
    const [reviews, setReviews] = useState([]);
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


            const paymentResponse = await axios.get(`http://localhost:5260/api/Review/user/admin/userId/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setReviews(paymentResponse.data);
        } catch (error) {
            setError('Error fetching review details');
        }
    };

    return (
        <div className='all-div'>
            <div className="heading">
                <h3>Review Details By UserName</h3>
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
                    {reviews.length > 0 && (
                        <div className="card-container">
                            {reviews.map(review => (
                                <div key={review.reviewId} className="card">
                                    <div className="card-body">
                                        <h4 className="card-title">ReviewId: {review.reviewId}</h4>
                                        <p className="card-text">Rating: {review.rating}</p>
                                        <p className="card-text">Comments: {review.comments}</p>
                                        <p className="card-text">ReviewDate: {review.reviewDate}</p>
                                        <p className="card-text">CarId: {review.carId}</p>
                                        <p className="card-text">UserId: {review.userId}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {reviews.length === 0 && <p>No review details found</p>}
                    {error && <p>{error}</p>}
                </div>
            </section>

        </div>
    );
}

export default GetReservationByUsername;
