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
            return { ...reservation, status: "cancelled" };
          }
          return reservation;
        }));
        alert("Reservation cancelled successfully");
      }
    } catch (err) {
      alert("Failed to cancel reservation");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1 className="heading">Reservation List</h1>
      <Table striped bordered hover className="table">
        <thead>
          <tr>
            <th>Reservation ID</th>
            <th>Pick Up Date & Time</th>
            <th>Drop Off Date & Time</th>
            <th>Pick Up Location</th>
            <th>Drop Off Location</th>
            <th>Status</th>
            <th>Total Price</th>
            <th>Cancel Reservation</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.reservationId}>
              <td>{reservation.reservationId}</td>
              <td>{reservation.pickUpDateTime}</td>
              <td>{reservation.dropOffDateTime}</td>
              <td>{reservation.pickUpStoreLocation}</td>
              <td>{reservation.dropOffStoreLocation}</td>
              <td>{reservation.status}</td>
              <td>{reservation.totalPrice}</td>
              <td>
                <button className="cancel-button" onClick={() => handleCancelReservation(reservation.reservationId)}>Cancel Reservation</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ReservationList;
