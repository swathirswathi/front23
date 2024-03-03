import React, { useEffect, useState } from 'react';
import axios from "axios";

function GetAllReviews() {
    var [reviews, setReviews] = useState([{
        "reviewId": 0,
        "rating": 0,
        "comments": "0",
        "reviewDate": 0,
        "carId": 0,
        "userId": 0
    }])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(
                    "http://localhost:5260/api/Review/Admin/user/GetAllReview",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                setReviews(response.data);
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
                    {reviews.map((review) =>
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
                    )}
                </div>
            </section>

        </div>
    );
}

export default GetAllReviews;
