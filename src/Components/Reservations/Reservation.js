import { Card } from "react-bootstrap";
import NavScrollExample from "../../Components/Cars/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import React from "react";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Reservation.css"

function Reservation() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  const [countries] = useState([
    { code: "hyderabad", title: "Hyderabad" },
    { code: "chennai", title: "Chennai" },
    { code: "banglore", title: "Banglore" },
    { code: "delhi", title: "Delhi" },
    { code: "Pune", title: "Pune" },
    { code: "Mumbai", title: "Mumbai" },
    { code: "goa", title: "Goa" },
    { code: "Kolkata", title: "Kolkata" },
    { code: "Coimbatore", title: "Coimbatore" },
    { code: "Vijayawada", title: "Vijaywada" },
  ]);

  //StartLocation
  const [toggleContents, setToggleContents] = useState("Select Location");
  const [selectedCountrystart, setSelectedCountry] = useState();
  //EndLocation
  const [toggleContent, setToggleContent] = useState("Select Location");
  const [selectedCountyend, setSelectedCounty] = useState();
  //Start and end Date
  const [start, setstart] = React.useState(dayjs());
  const [end, setend] = React.useState(dayjs());

  const [selectedDiv, setSelectedDiv] = useState(null);
  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  //Review
  const [usernames, setUsernames] = useState({});
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');

  //Wallet an offers
  const [result, setResult] = useState();
  const [res, setRes] = useState(0); // Storing trip amount

  const Trip = () => {
    var months = [30, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var Seater = data.Data.dailyRate;
    if (start.$M === end.$M) {
      setRes((end.$D - start.$D) * Seater);
    } else {
      var days = months[start.$M] - start.$D + end.$D;
      setRes(days * Seater);
    }
  };

  //Review
  const handleRatingChange = (event) => {
    setRating(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  useEffect(() => {
    (async () => {
      await GetUserDetails();
     fetchReviews();
    })();
  }, []);

  async function GetUserDetails() {
    try {
      const token1 = localStorage.getItem('token');
      const result = await axios.get(
        "http://localhost:5260/api/User/user/GetUser/get/" + data.username,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setResult(result.data);
    } catch (err) {
      alert(err);
    }
  }

  //AddReservation And check for overlapping
  const AddReservation = async () => {
    try {
      const token1 = localStorage.getItem('token');
      const reservationsResponse = await axios.get(
        `http://localhost:5260/api/Reservation/user/Admin/ Car/${data.Data.carId}`,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      const existingReservations = reservationsResponse.data;

      // Check for overlapping reservations
      const overlap = existingReservations.some((reservation) => {
        const reservationStart = dayjs(reservation.pickUpDateTime);
        const reservationEnd = dayjs(reservation.dropOffDateTime);
        return (
          (start.isBetween(reservationStart, reservationEnd, null, "[]") ||
            end.isBetween(reservationStart, reservationEnd, null, "[]")) ||
          (reservationStart.isBetween(start, end, null, "[]") ||
            reservationEnd.isBetween(start, end, null, "[]"))
        );
      });

      // If there's no overlap, allow the user to proceed
      if (!overlap) {
        const reservationResponse = await axios.post("http://localhost:5260/api/Reservation/user/MakeReservation", {
          pickUpDateTime: start.toISOString(),
          dropOffDateTime: end.toISOString(),
          status: "Booked",
          pickUpStoreLocation: selectedCountrystart,
          dropOffStoreLocation: selectedCountyend,
          totalPrice: res + 99 + 99,
          paymentId: 0,
          userId: result.userId,
          carId: data.Data.carId,
        }, {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        });
        const reservationId = reservationResponse.data.reservationId;
        alert("Reservation success");
        navigate("/payment", {
          state: {
            token: data.token,
            res: res,
            result: result,
            reservation: reservationResponse.data,
            username: data.username,
            reservationId: reservationId,
          },
        });
      } else {
        // Show message indicating that the car is already booked for the selected dates
        alert("The car is already booked for the selected dates. Please choose different dates.");
      }
    } catch (err) {
      alert(err);
    }
  }

 //AddReview
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token1 = localStorage.getItem('token');
      const response1 = await axios.post('http://localhost:5260/api/Review/user/admin/add', {
        rating: rating,
        comments: comments,
        userId: result.userId,
        carId: data.Data.carId,
      }, {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      });
      alert("Review added successfully")
    } catch (error) {
      alert('Error:', error);
    }
  };
 
  //Displaying review
  const fetchReviews = async () => {
    try {
      const token1 = localStorage.getItem('token');
      const response = await axios.get(
        "http://localhost:5260/api/Review/admin/user/car/" + data.Data.carId, {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setReviews(response.data);
      for (const review of response.data) {
        await GetUserDetailsByReview(review.userId);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  async function GetUserDetailsByReview(userId) {
    try {
      const token1 = localStorage.getItem('token');
      const result1 = await axios.get(
        "http://localhost:5260/api/User/user/GetUser/" + userId,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setUsernames((prevUsernames) => ({
        ...prevUsernames,
        [userId]: result1.data.firstName + " " + result1.data.lastName,
      }));
    } catch (err) {
      alert(err);
    }
  }
  
  //Rating Stars
  const renderStars = (rating) => {
    const filledStar = '\u2B50'; // Unicode for filled star
    const emptyStar = '\u2606'; // Unicode for empty star
    const stars = filledStar.repeat(rating) + emptyStar.repeat(5 - rating);
  return stars;
  };
  const renderReviews = () => {
    return reviews.map((review, index) => (
      <div style={{ border: "2px solid #d2d8dd", borderRadius: "4px", margin: "2px", padding: "4px" }} key={index}>
        <h6>{usernames[review.userId]}</h6>
        <p style={{ fontSize: "1.1rem" }}>{renderStars(review.rating)}</p>
        <p style={{ fontSize: "1rem" }}>{review.comments}</p>
      </div>
    ));
  };

  

  return (
    <>
      <NavScrollExample />


      <div className="reserve">
        <Card style={{
            position: "relative",
            marginLeft: "30px",
            width: "50rem",
            height: "42rem",
            top: "100px",
          }}
        >
         
          <Card.Header style={{ height: "400px" }}>
            <img
              style={{ height: "380px", marginLeft: "40px" }}
              src={data.Data.imageURL}
              alt="img"
            />
          </Card.Header>

          <div
            style={{
              marginLeft: "20px",
              fontSize: "large",
              fontWeight: "500",
              marginTop: "10px",
            }}
          >
              <h5>{data.Data.make + " " + data.Data.model}</h5>
          </div>

          <div style={{ marginLeft: "30px", marginTop: "10px" }}>From</div>
          <div style={{textAlign: "center", position: "relative", bottom: "20px",marginRight: "110px",}}> To </div>
         
          <div style={{ position: "relative", right: "270px", bottom: "70px" }}>
           
            <span className="starttime" style={{ position: "absolute", width: "200px", marginLeft: "300px", marginTop: "60px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="Start Date" value={start} onChange={(newValue) => setstart(newValue)} format="LLL"/>
                </DemoContainer>
              </LocalizationProvider>
            </span>

            <span className="endtime" style={{ position: "absolute", width: "200px", marginLeft: "600px", marginTop: "60px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker label="End Date" value={end} onChange={(newValue) => setend(newValue)} format="LLL"/>
                </DemoContainer>
              </LocalizationProvider>
            </span>

            <Button
              variant="outline-primary"
              style={{ position: "relative", top: "75px", left: "950px" }}
              onClick={Trip}
            >
              Save
            </Button>

          </div>


          <Dropdown style={{ position: "relative", right: "883px", bottom: "60px" }} onSelect={(eventKey) => {const { code, title } = countries.find( ({ code }) => eventKey === code );
              setSelectedCountry(eventKey);
              setToggleContents(<>{title}</>);
            }}
          >
            <Dropdown.Toggle variant="outline-primary" id="dropdown-flags" className="text-left" >
              {toggleContents}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {countries.map(({ code, title }) => (
                <Dropdown.Item key={code} eventKey={code}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown style={{ position: "relative", right: "572px", bottom: "100px" }} onSelect={(eventKey) => {const { code, title } = countries.find( ({ code }) => eventKey === code);
              setSelectedCounty(eventKey);
              setToggleContent(<>{title}</>);
            }}
          >
            <Dropdown.Toggle variant="outline-primary" id="dropdown-flags" className="text-left">
              {toggleContent}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {countries.map(({ code, title }) => (
                <Dropdown.Item key={code} eventKey={code}>
                  {title}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>

          </Dropdown>
        </Card>


        <div className="secondcard">
          <Card style={{
              width: "38rem",
              marginLeft: "40px",
              height: "500px",
              position: "relative",
              top: "100px",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "white",
                fontWeight: "500",
                borderBottom: "none",
                height: "50px",
                textAlign: "center",
              }}
            >
              Wallet & Offers
            </Card.Header>

            <ListGroup style={{ borderRadius: "0px" }}>
              <ListGroup.Item>
                Trip Amount
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#8377;
                {res}
              </ListGroup.Item>
              <ListGroup.Item>
                Trip Protection
                Fee&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                +&#8377;99
              </ListGroup.Item>
              <ListGroup.Item>
                Convenience
                Fee&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&nbsp;
                +&#8377;99
              </ListGroup.Item>
              <ListGroup.Item>
                Total
                Amount&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&#8377;
                {res + 99 + 99}
              </ListGroup.Item>
              <ListGroup.Item>
                Refundable
                Deposit&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&#8377;0
              </ListGroup.Item>
              <ListGroup.Item>
                Final
                Amount&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&#8377;
                {res + 99 + 99}
              </ListGroup.Item>
            </ListGroup>
            <div>

              <div style={{ position: "relative", top: "20px", left: "20px" }}>
                Please Review Final Amount
              </div>
              <Button
                variant="success"
                style={{ position: "relative", left: "200px", top: "70px" }}
                onClick={AddReservation}
              >
                Proceed to payment &#8377;{res + 99 + 99}
              </Button>
            </div>
          </Card>
        </div>


        <div className="thirdcard">
          <div
            style={{
              marginLeft: "30px",
              fontSize: "large",
              fontWeight: "500",
              position: "relative",
              top: "140px",
            }}
          >
            <ul>
              <li>
                {data.Data.make + " " + data.Data.model} Car Specifications
              </li>
            </ul>
          </div>
          <Card
            style={{
              width: "50rem",
              marginLeft: "30px",
              position: "relative",
              top: "140px",
            }}
          >
            <ListGroup variant="flush">
              <ListGroup.Item>
                Price&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&#8377;
                {data.Data.dailyRate}/day
              </ListGroup.Item>
              <ListGroup.Item>
                Mileage&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {data.Data.specification?.slice(9, 15)}
              </ListGroup.Item>
              <ListGroup.Item>
                Engine&emsp;&emsp;&emsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;
                {data.Data.specification?.slice(16, 30)}
              </ListGroup.Item>
              <ListGroup.Item>
                Fuel&emsp;&emsp;&emsp;
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                Petrol & Diesel
              </ListGroup.Item>
              <ListGroup.Item>
                Transmission&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                &nbsp; {data.Data.specification?.slice(38, 45)}
              </ListGroup.Item>
              <ListGroup.Item>
                Seater&emsp;&emsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                {data.Data.specification?.slice(0, 8)}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>


        <div className="forthcard">
          <Card
            style={{
              width: "38rem",
              marginLeft: "15px",
              marginRight: "5px",
              position: "relative",
              top: "3px",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "white",
                fontWeight: "700",
                fontSize:"1.5rem",
                borderBottom: "none",
                height: "50px",
                textAlign: "center",
              }}
            >
              Reviews
            </Card.Header>

            <Card.Body>
              <div>
                
            {reviews.length > 0 ? (
              renderReviews()
            ) : (
              <p>No reviews available</p>
            )}
              </div>
              <h6 style={{ textAlign: "center", fontSize: "1.2rem" }}>Add Review</h6>
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

      </div>
    </>
  );
}
export default Reservation;