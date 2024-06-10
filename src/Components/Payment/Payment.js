import { Card,  Spinner, Modal,Form } from "react-bootstrap";
import NavScrollExample from "../../Components/Cars/Navbar";
import card from "../../Images/credit-card.png";
import wallet from "../../Images/wallet.png";
import upi from "../../Images/upi.png";
import "./Payment.css";
import { useState, useEffect } from "react";
import gpay from "../../Images/Gpay.png";
import phonepe from "../../Images/PhonePe.png";
import qrcode from "../../Images/QRcode.jpg";
import { useNavigate,useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import back from "../../Images/Back.jpg";

function Payment() {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const res = location.state;

  const changeColor = (index, method) => {
    setSelectedDiv(index);
    setSelectedPaymentMethod(method);
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().slice(0, 10);
  const [reservation1, setReservation] = useState();
  const [username, setUserName] = useState();
 
  const AddPayment = async () => {
    try {
      setLoading(true);
      if (!location.state || !location.state.reservation) {
        alert("Reservation data is missing.");
        return;
      }
      const reservation = location.state.reservation;
      setReservation(reservation);
      const username = location.state.username;
      setUserName(username);
      const res = location.state.res;
      const token = location.state.token;
      const token1 = localStorage.getItem('token');
      await axios.post("http://localhost:5260/api/Payment/user/payment/make", {
        paymentMethod: selectedPaymentMethod, // Use selected payment method
        paymentAmount: res + 99 + 99,
        paymentStatus: "Paid",
        transactionId: 108000 + (res + 99 + 99) + 1,
        transactionDate: formattedDate,
        reservationId: reservation.reservationId,
        userId: reservation.userId,
        carId: reservation.carId
      }, {
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      });
      setLoading(false);
      alert("Payment success");
      setShowModal(true);
      // navigate("/dashBoard", {
      //   state: {
      //     token: token,
      //     username: username
      //   }
      // });
    } catch (err) {
      alert("Payment failed");
      console.error("Error making payment:", err);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {

      const token1 = localStorage.getItem('token');
      await axios.post("http://localhost:5260/api/Review/user/admin/add", {
        rating: rating,
        comments: comments,
        carId: reservation1.carId,
        userId: reservation1.userId
      },{
        headers: {
          Authorization: `Bearer ${token1}`,
        },
      });
      setShowModal(false); // Hide modal after submitting feedback
      alert("Feedback submitted successfully");
      navigate("/dashBoard", {
        state: {
          token: token1,
          username: username
        }
      });
    } catch (err) {
      alert("Failed to submit feedback");
      console.error("Error submitting feedback:", err);
    }
  };

  const navigateFunc=()=>{
    const token1 = localStorage.getItem('token');
    navigate("/dashBoard", {
      state: {
        token: token1,
        username: username
      }
    });
  };
  const handleGoBack = () => {
    window.history.back(); // Navigate back using browser's built-in functionality
  };

  return (
    <>
      <NavScrollExample />

      {loading ? (
        <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width:'100vw' }} >
          <Spinner animation="border" variant="primary" />
          <p>Processing payment...</p>
        </div>
      ) : (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
         <button
                  type="button"
                  className="btn btn-secondary mb-3"
                  style={{ padding: "2px", backgroundColor: "white", height:"30px", width:"30px",marginTop:"100px" }}
                  onClick={() => navigate(-1)}
                >
                  <img style={{ height: "20px" }} src={back} alt="Back" />
                </button>
        <div
          style={{
            position: "absolute",
            top: "180px",
            left: "220px",
            fontWeight: "500",
            fontSize: "large",
          }}
        >
          Select a Payment Method
        </div>
        <Card
          style={{
            width: "20rem",
            height: "18rem",
            top: "200px",
            left: "205px",
          }}
        >
          <div
            style={{
              position: "relative",
              marginTop: "20px",
              marginLeft: "20px",
              marginBottom: "20px",
              fontWeight: "500"
            }}
          >
            Payment Options
          </div>

          <div
                className={selectedDiv === 1 ? "box red" : "box"}
                onClick={() => changeColor(1, "UPI")} // Pass method as argument
                style={{ display: "flex" }}
              >
                <img
                  style={{
                    height: "40px",
                    position: "relative",
                    marginTop: "10px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  src={upi}
                  alt="img"
                />
                <p
                  style={{
                    marginTop: "12px",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                >
                  UPI
            </p>
            <p
              style={{
                position: "relative",
                top: "32px",
                fontSize: "small",
                right: "25px",
                opacity: "0.7",
              }}
            >
              Google pay,PhonePe,BHIM UPI
            </p>
          </div>
          <br/>
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
              bottom: "30px",
            }}
          />
          <div
            className={selectedDiv === 3 ? "box red" : "box"}
            onClick={() => changeColor(3, "Mobile Wallet")}
            style={{
              textAlign: "left",
              display: "flex",
              position: "relative",
              bottom: "40px",
            }}
          >
            <img
              style={{
                height: "40px",
                marginLeft: "15px",
                marginTop: "10px",
                cursor: "pointer",
              }}
              src={wallet}
              alt="img"
            />
            <p
              style={{
                marginTop: "12px",
                marginLeft: "10px",
                cursor: "pointer",
              }}
            >
              Mobile Wallet
            </p>
            <p
              style={{
                position: "absolute",
                top: "31px",
                left: "65px",
                fontSize: "small",
                opacity: "0.7",
              }}
            >
              All major wallets are supported
            </p>
          </div>
        </Card>
        <Card
          style={{
            width: "25rem",
            height: "18rem",
            top: "200px",
            left: "200px",
            borderRadius: "0"
          }}
        >
          <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Select UPI App</div>
          <div style={{ marginLeft: "30px", fontSize: "small", opacity: "0.7" }}> </div>
          <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Preferred Payment Options</div>
          <div style={{ display: "flex", flexWrap: "wrap", position: "relative", top: "20px" }} className={selectedDiv === 4 ? "box red" : "box"}
            onClick={() => changeColor(4,"Google pay")}>
            <img style={{ height: "23px", marginTop: "9px", marginLeft: "20px" }} src={gpay} alt="img" />
            <p style={{ marginLeft: "60px", marginTop: "5px", fontSize: "medium" }}>Google pay</p>
          </div>
          <hr
            style={{
              marginLeft: "20px",
              marginRight: "20px",
              position: "relative",
              top: "10px"
            }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", position: "relative" }} className={selectedDiv === 5 ? "box red" : "box"}
            onClick={() => changeColor(5, "PhonePe")}>
            <img style={{ height: "30px", marginTop: "9px", marginLeft: "23px" }} src={phonepe} alt="img" />
            <p style={{ marginLeft: "77px", marginTop: "10px", fontSize: "medium" }}>PhonePe</p>
          </div>



        <Link>
          <Button variant="primary" style={{ml:"5px"}} onClick={AddPayment}> Pay </Button>
        </Link>



        </Card>
        <Card style={{ width: "20rem", height: "18rem", top: "200px", marginLeft: "200px", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
          <div style={{textAlign:"center"}}>
            <p style={{position:"relative",top:"15px",fontWeight:"500"}}>Scan QR to Pay</p>
            <img style={{ height: "220px", width: "240px" }} src={qrcode} alt="img" />
          </div>
        </Card>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="rating">
              <Form.Label>Rating</Form.Label>
              <Form.Select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
                  <option value="5">&#128525; Excellent</option>
                  <option value="4">&#128512; Good</option>
                  <option value="3">&#128529; Average</option>
                  <option value="2">&#128544; Poor</option>
                  <option value="1">&#128520; Very Poor</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="comments">
              <Form.Label>Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={comments} onChange={(e) => setComments(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={navigateFunc}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFeedbackSubmit}>
            Submit Feedback
          </Button>
        </Modal.Footer>
      </Modal>
      </div>

       )}
    </>
  );
}

export default Payment;

       

// import { Card, Spinner } from "react-bootstrap";
// import NavScrollExample from "../../Components/Cars/Navbar";
// import card from "../../Images/credit-card.png";
// import wallet from "../../Images/wallet.png";
// import upi from "../../Images/upi.png";
// import "./Payment.css";
// import { useState, useEffect } from "react";
// import gpay from "../../Images/Gpay.png";
// import phonepe from "../../Images/PhonePe.png";
// import qrcode from "../../Images/QRcode.jpg";
// import { useNavigate, useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import axios from "axios";

// function Payment() {
//   const [selectedDiv, setSelectedDiv] = useState(null);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(""); // State to store selected payment method
//   const location = useLocation();
//   const navigate = useNavigate();
//   const res = location.state;
//   const changeColor = (index, method) => { // Method parameter added
//     setSelectedDiv(index);
//     setSelectedPaymentMethod(method); // Update selected payment method
//   };
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     // Simulate API call
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Adjust this time according to your needs
//   }, []);

//   const currentDate = new Date();
//   const formattedDate = currentDate.toISOString().slice(0, 10);

  


//   const AddPayment = async () => {
//     try {
//       setLoading(true);
//       if (!location.state || !location.state.reservation) {
//         alert("Reservation data is missing.");
//         return;
//       }
//       const reservation = location.state.reservation;
//       const res = location.state.res;
//       const token = location.state.token;
//       const username = location.state.username;
//       const token1 = localStorage.getItem('token');
//       await axios.post("http://localhost:5260/api/Payment/user/payment/make", {
//         paymentMethod: selectedPaymentMethod, // Use selected payment method
//         paymentAmount: res + 99 + 99,
//         paymentStatus: "Paid",
//         transactionId: 108000 + (res + 99 + 99) + 1,
//         transactionDate: formattedDate,
//         reservationId: reservation.reservationId,
//         userId: reservation.userId,
//         carId: reservation.carId
//       }, {
//         headers: {
//           Authorization: `Bearer ${token1}`,
//         },
//       });
//       setLoading(false);
//       console.log("token", token)
//       alert("Payment success");
//       console.log("token", token)
//       // navigate("/dashBoard", {
//       //   state: {
//       //     token: token,
//       //     username: username
//       //   }
//       // });
//       navigate("/addComment", {
//         state: {
//           token: token,
//           reservation: reservation
//         }
//       });
//     } catch (err) {
//       alert("Payment failed");
//       console.error("Error making payment:", err);
//     }
//   };


//   return (
//     <>
//       <NavScrollExample />

//       {loading ? (
//         <div className="text-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }} >
//           <Spinner animation="border" variant="primary" />
//           <p>Processing payment...</p>
//         </div>
//       ) : (
//         <div style={{ display: "flex", flexWrap: "wrap" }}>
//           <div
//             style={{
//               position: "absolute",
//               top: "180px",
//               left: "220px",
//               fontWeight: "500",
//               fontSize: "large",
//             }}
//           >
//             Select a Payment Method
//           </div>
//           <Card
//             style={{
//               width: "20rem",
//               height: "18rem",
//               top: "200px",
//               left: "205px",
//             }}
//           >
//             <div
//               style={{
//                 position: "relative",
//                 marginTop: "20px",
//                 marginLeft: "20px",
//                 marginBottom: "20px",
//                 fontWeight: "500"
//               }}
//             >
//               Payment Options
//             </div>

//             <div
//               className={selectedDiv === 1 ? "box red" : "box"}
//               onClick={() => changeColor(1, "UPI")} // Pass method as argument
//               style={{ display: "flex" }}
//             >
//               <img
//                 style={{
//                   height: "40px",
//                   position: "relative",
//                   marginTop: "10px",
//                   marginLeft: "15px",
//                   cursor: "pointer",
//                 }}
//                 src={upi}
//                 alt="img"
//               />
//               <p
//                 style={{
//                   marginTop: "12px",
//                   marginLeft: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 UPI
//               </p>
//               <p
//                 style={{
//                   position: "relative",
//                   top: "32px",
//                   fontSize: "small",
//                   right: "25px",
//                   opacity: "0.7",
//                 }}
//               >
//                 Google pay,PhonePe,BHIM UPI
//               </p>
//             </div>
//             <br />
//             <hr
//               style={{
//                 marginLeft: "20px",
//                 marginRight: "20px",
//                 position: "relative",
//                 bottom: "30px",
//               }}
//             />
//             <div
//               className={selectedDiv === 3 ? "box red" : "box"}
//               onClick={() => changeColor(3, "Mobile Wallet")}
//               style={{
//                 textAlign: "left",
//                 display: "flex",
//                 position: "relative",
//                 bottom: "40px",
//               }}
//             >
//               <img
//                 style={{
//                   height: "40px",
//                   marginLeft: "15px",
//                   marginTop: "10px",
//                   cursor: "pointer",
//                 }}
//                 src={wallet}
//                 alt="img"
//               />
//               <p
//                 style={{
//                   marginTop: "12px",
//                   marginLeft: "10px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Mobile Wallet
//               </p>
//               <p
//                 style={{
//                   position: "absolute",
//                   top: "31px",
//                   left: "65px",
//                   fontSize: "small",
//                   opacity: "0.7",
//                 }}
//               >
//                 All major wallets are supported
//               </p>
//             </div>
//           </Card>
//           <Card
//             style={{
//               width: "25rem",
//               height: "18rem",
//               top: "200px",
//               left: "200px",
//               borderRadius: "0"
//             }}
//           >
//             <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Select UPI App</div>
//             <div style={{ marginLeft: "30px", fontSize: "small", opacity: "0.7" }}> </div>
//             <div style={{ marginLeft: "20px", marginTop: "20px", fontWeight: "500" }}>Preferred Payment Options</div>
//             <div style={{ display: "flex", flexWrap: "wrap", position: "relative", top: "20px" }} className={selectedDiv === 4 ? "box red" : "box"}
//               onClick={() => changeColor(4, "Google pay")}>
//               <img style={{ height: "23px", marginTop: "9px", marginLeft: "20px" }} src={gpay} alt="img" />
//               <p style={{ marginLeft: "60px", marginTop: "5px", fontSize: "medium" }}>Google pay</p>
//             </div>
//             <hr
//               style={{
//                 marginLeft: "20px",
//                 marginRight: "20px",
//                 position: "relative",
//                 top: "10px"
//               }}
//             />
//             <div style={{ display: "flex", flexWrap: "wrap", position: "relative" }} className={selectedDiv === 5 ? "box red" : "box"}
//               onClick={() => changeColor(5, "PhonePe")}>
//               <img style={{ height: "30px", marginTop: "9px", marginLeft: "23px" }} src={phonepe} alt="img" />
//               <p style={{ marginLeft: "77px", marginTop: "10px", fontSize: "medium" }}>PhonePe</p>
//             </div>



//             <Link>
//               <Button variant="primary" style={{ ml: "5px" }} onClick={AddPayment}> Pay </Button>
//             </Link>



//           </Card>
//           <Card style={{ width: "20rem", height: "18rem", top: "200px", marginLeft: "200px", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}>
//             <div style={{ textAlign: "center" }}>
//               <p style={{ position: "relative", top: "15px", fontWeight: "500" }}>Scan QR to Pay</p>
//               <img style={{ height: "220px", width: "240px" }} src={qrcode} alt="img" />
//             </div>
//           </Card>
//         </div>
//       )}
//     </>
//   );
// }

// export default Payment;

