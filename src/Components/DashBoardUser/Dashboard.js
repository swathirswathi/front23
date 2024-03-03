import React, { useEffect, useState } from "react";
import NavScrollExample from "../../Components/Cars/Navbar";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Card from "react-bootstrap/Card";
import logo from "../../Images/car-logo.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./Dashboard.css";
import { Link } from "react-router-dom";

function Dashboard() {
  const [carData, setCarData] = useState([]);
  const [averageRatings, setAverageRatings] = useState({});
  const location = useLocation();
  const token = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      (async () => {
        await GetCarDetails();
      })();
    }
  }, []);

  async function GetCarDetails() {
    try {
      const token1 = localStorage.getItem('token');
      const result = await axios.get(
        "http://localhost:5260/api/Car/admin/cars/GetCarsList",
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setCarData(result.data);
      fetchAverageRatings(result.data);
    } catch (err) {
      toast.error(err);
    }
  }

  async function fetchAverageRatings(data) {
    try {
        const promises = data.map(async (car) => {
        const averageRating = await getAverageRating(car.carId);
        return { carId: car.carId, rating: averageRating };
      });
  
      const ratings = await Promise.all(promises);
      const ratingsMap = {}; //Stores the average ratings mapped by carID
      ratings.forEach((item) => {
        ratingsMap[item.carId] = item.rating;
      });
      setAverageRatings(ratingsMap);

    } catch (error) {
      console.error("Error fetching average ratings:", error);
    }
  }

  async function getAverageRating(carId) {
    try {
      const token1 = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5260/api/Review/admin/user/car/${carId}`,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      const reviews = response.data;
      if (reviews.length === 0) return 0;
  
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      return Math.ceil(averageRating);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return 0;
      } else {
        console.error("Error fetching reviews:", error);
        return 0;
      }
    }
  }
 
  const renderStars = (rating) => {
    const filledStar = '\u2B50'; // Unicode for filled star
    const emptyStar = '\u2606'; // Unicode for empty star
    const stars = filledStar.repeat(rating) + emptyStar.repeat(5 - rating);
    return stars;
  };

  //To rent only Available Cars
  const handleRentClick = (event, Data) => {
    event.preventDefault();

    if (Data.availability) {
      navigate("/reservation", {
        state: { Data: Data, username: token.username, token: token.token },
      });
    } else {
      alert("This car is not available for rent.");
    }
  };

  return (
    <>
      <NavScrollExample
        state={{
          data: token.token,
          username: token.username ? token.username : null,
          email: token.email ? token.email : null,
          pic: token.picture ? token.picture : null,
          name: token.name ? token.name : null,
        }}
      />
      <br />
      <ToastContainer />
      <br /><br /><br />

      <div style={{ textAlign: 'center' }}>
        <h1 style={{ color: 'navy' }}>Welcome to RoadReadyRentals</h1>
        <p style={{ color: 'navy' }}>Please Explore our services</p>
      </div>

      <div className="cardd">
        {carData
          ? carData.map(function fn(Data) {
            return (
              <Card key={Data.id} /* Add key prop*/ style={{ width: "18rem", borderColor: "grey" }}className="solocard">
                <Card.Img variant="top" src={Data ? Data.imageURL : logo} />
                
                <Card.Body>
                  <Card.Title
                    style={{
                      fontFamily:
                        "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                    }}
                  >
                    <p>{renderStars(averageRatings[Data.carId])}</p>
                    {Data ? Data.make + " " + Data.model : ""}
                  </Card.Title>

                  {Data ? (
                    <>
                      <p style={{
                          fontSize: "15px",
                          opacity: "0.7",
                          fontFamily:"-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                        }}
                      >
                        {Data.specification}
                      </p>

                      <p
                        style={{ fontFamily: "-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",
                        }}
                      >
                        Available :{Data.availability ? "Yes" : "No"}
                      </p>
                    </>
                  ) : (
                    <p>No car data available</p>
                  )}

                  <Link
                    to={{ pathname: "/reservation",}}
                    state={{
                      Data: Data,
                      username: token.username,
                      token: token.token,
                    }}
                  >
                    <Button
                      variant="primary"
                      onClick={(event) => handleRentClick(event, Data)}
                    >
                      Rent
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            );
          })
          : ""}
      </div>
    </>
  );
}

export default Dashboard;
