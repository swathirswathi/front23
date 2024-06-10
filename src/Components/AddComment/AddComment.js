import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

function AddComment({ location }) {
  const { token, reservation } = location.state;
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");

  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // try {
    //   const response = await axios.post(
    //     "http://localhost:5260/api/Review/user/admin/add",
    //     {
    //       rating: rating,
    //       comments: comments,
    //       userId: reservation.userId,
    //       carId: reservation.carId,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   alert("Review added successfully");
    // } catch (error) {
    //   alert("Error:", error);
    // }
  };

  return (
    <>
      <div className="forthcard">
        <Card>
          <Card.Header>Feedback</Card.Header>
          <Card.Body>
            <h6>Add Feedback</h6>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="rating">Rating:</label>
                <select
                  id="rating"
                  name="rating"
                  value={rating}
                  onChange={handleRatingChange}
                >
                  <option value="5">&#128525;Excellent</option>
                  <option value="4">&#128512;Good</option>
                  <option value="3">&#128529;Average</option>
                  <option value="2">&#128544;Poor</option>
                  <option value="1">&#128520;Very Poor</option>
                </select>
              </div>
              <div>
                <label htmlFor="comments">Comments:</label>
                <textarea
                  id="comments"
                  name="comments"
                  value={comments}
                  onChange={handleCommentsChange}
                />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}

export default AddComment;