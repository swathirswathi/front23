import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { useParams } from "react-router-dom";
import "./reservationList.css";

function ReservationList() {
  const { userId } = useParams();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      setError(null);

      try {
        const token1 = localStorage.getItem('token');  
        const response = await axios.get(`http://localhost:5260/api/Reservation/user/Admin/${userId}`,
        {
            headers: {
              Authorization: `Bearer ${token1}`,
            },
          });
        setReservations(response.data);
      } catch (err) {
        setError(err.message || "Error fetching reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]); 

  const handleCancelReservation = async (reservationId) => {
    try {
        const token1 = localStorage.getItem('token');  
        const confirmation = window.confirm("Are you sure you want to cancel this reservation?");
        if (confirmation) {
          await axios.put(
            `http://localhost:5260/api/Reservation/user/${reservationId}/cancel`,
            {}, // Empty object as the second argument if no data is being sent
            {
              headers: {
                Authorization: `Bearer ${token1}`,
              },
            }
          );
        
        setReservations(reservations.map(reservation => {
          if (reservation.reservationId === reservationId) {
            return { ...reservation, status: "Cancelled" };
          }
          return reservation;
        }));
        alert("Reservation cancelled successfully");
      }
    } catch (err) {
      alert("Failed to cancel reservation");
    }
  };

  const handleGoBack = () => {
    window.history.back(); // Navigate back using browser's built-in functionality
  };

  return (
    <div className="container">
      <h1 className="heading">Reservation List</h1>
      <button className="back-button" onClick={handleGoBack}>Back</button> {/* Back button*/} 
      <div className="row">
        {reservations.map((reservation) => (
          <div className="col-md-6" key={reservation.reservationId}>
            <div className="card mb-3">
              <div className="row g-0">
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">Reservation ID: {reservation.reservationId}</h5>
                    <p className="card-text">Pick Up Date & Time: {reservation.pickUpDateTime}</p>
                    <p className="card-text">Drop Off Date & Time: {reservation.dropOffDateTime}</p>
                    <p className="card-text">Pick Up Location: {reservation.pickUpStoreLocation}</p>
                    <p className="card-text">Drop Off Location: {reservation.dropOffStoreLocation}</p>
                    <p className="card-text">Status: {reservation.status}</p>
                    <p className="card-text">Total Price: {reservation.totalPrice}</p>
                    <p className="card-text">
                      {reservation.status !== "Cancelled" ? (
                        <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservationId)}>Cancel Reservation</button>
                      ) : (
                        <button className="cancel-button" disabled>Cancelled</button>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReservationList;
