import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import NavScrollExample from "../../Components/MainNav/mainNav";
import img from "../../Images/profile-logo.png";
import "./Cars.css";

function Profile() {
  const [data, setCarData] = useState({});
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPhoneNumber, setShowEditPhoneNumber] = useState(false);
  const [editedData, setEditedData] = useState({});
  const location = useLocation();
  const toke = location.state;

  const [selectedDiv, setSelectedDiv] = useState(null);

  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  useEffect(() => {
    if (toke) {
      getUserDetails();
    }
  }, [toke]);

  async function getUserDetails() {
    try {
      const result = await axios.get(
        `http://localhost:5260/api/User/user/GetUser/get/${toke.username}`,
        {
          headers: {
            Authorization: `Bearer ${toke.token}`,
          },
        }
      );
      setCarData(result.data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const handleEditEmail = () => {
    setShowEditEmail(true);
  };

  const handleEditPhoneNumber = () => {
    setShowEditPhoneNumber(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };

  const handleSaveEmail = async () => {
    try {
      const { userId: tokenUserId } = toke;
      const { email } = editedData;
      const userId = data.userId ? data.userId : tokenUserId;
      await axios.put(
        `http://localhost:5260/api/User/${userId}/update-email`,
        { userId, email },
        {
          headers: {
            Authorization: `Bearer ${toke.token}`,
          },
        }
      );
      alert("Email updated successfully");
      await getUserDetails();
      setShowEditEmail(false);
    } catch (err) {
      alert("Failed to update email");
    }
  };

  const handleSavePhoneNumber = async () => {
    try {
      const { userId: tokenUserId } = toke;
      const { phoneNumber } = editedData;
      const userId = data.userId ? data.userId : tokenUserId;

      await axios.put(
        `http://localhost:5260/api/User/${userId}/update-phone-number`,
        { userId, phoneNumber },
        {
          headers: {
            Authorization: `Bearer ${toke.token}`,
          },
        }
      );
      alert("Phone number updated successfully");
      await getUserDetails();
      setShowEditPhoneNumber(false);
    } catch (err) {
      alert("Failed to update phone number");
    }
  };

  return (
    <>
      <NavScrollExample />
      <div className="profile-cont">
        <div className="profile-sidebar">
          <Card style={{ position: "relative", width: "25vw", height: "70vh", top: "100px" }}>
            <Card.Header style={{ backgroundColor: "white", height: "200px" }}>
              <div>
                <img style={{ height: "120px", marginTop: "10px" }} src={img} alt="img" />
              </div>
              <div style={{ marginTop: "5px" }}>
                <b>{data.firstName ? data.firstName : toke?.name}</b>
              </div>
              <div style={{ opacity: "0.8" }}>{data.email ? data.email : toke?.email}</div>
            </Card.Header>
            <div
              style={{ textAlign: "start", cursor: "pointer" }}
              className={selectedDiv === 0 ? "box red" : "box"}
              onClick={() => changeColor(0)}
            >
              <p style={{ marginLeft: "20px", marginTop: "10px" }}>Account</p>
              <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" style={{ mt:"0px",ml: "5px" }}> Logout </Button>
            </Link>

            </div>
          </Card>
        </div>
        <div>
          <Card style={{ width: "70vw", height: "70vh", top: "100px" }}>
            <Card.Header style={{ borderBottom: "none", backgroundColor: "white", fontSize: "Large", fontWeight: "500" }}>
              Account
              <br />
              
              {/* Construct link to ReservationList with userId as state */}
              {data.userId && (
                <Link
                  to={{
                    pathname: `/reservationList/${data.userId}`,
                    state: { userId: data.userId },
                  }}
                >
                  View Reservations: {data.userId}
                </Link>
              )}
            </Card.Header>
            <div style={{ marginTop: "50px", textAlign: "left", marginLeft: "30px", fontSize: "large", fontWeight: "500" }}>Account Details</div>
            <hr style={{ marginLeft: "20px", marginRight: "20px", position: "relative", bottom: "15px" }} />
            <div style={{ textAlign: "left", position: "relative", bottom: "10px" }}>
              <p style={{ marginLeft: "40px" }}>First Name: {data.firstName ? data.firstName : toke?.name}</p>
              <p style={{ marginLeft: "40px" }}>Last Name: {data.lastName ? data.lastName : "None"}</p>
              <p style={{ marginLeft: "40px" }}>Username: {data.username ? data.username : toke?.email}</p>
            </div>
            <div style={{ position: "relative", textAlign: "center", bottom: "130px" }}>
              <p style={{ marginLeft: "95px" }}>Email: {data.email ? data.email : toke?.email}</p>
              {showEditEmail ? (
                <>
                  <input
                    type="email"
                    name="email"
                    value={editedData.email || ""}
                    onChange={handleEditChange}
                    placeholder="New Email"
                  />
                  <Button variant="primary" onClick={handleSaveEmail}>Save Email</Button>
                </>
              ) : (
                <Button style={{ marginLeft: "55px" }} variant="link" onClick={handleEditEmail}>Edit Email</Button>
              )}
              <p style={{ marginLeft: "55px" }}>Mobile: {data.phoneNumber ? data.phoneNumber : "None"}</p>
              {showEditPhoneNumber ? (
                <>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={editedData.phoneNumber || ""}
                    onChange={handleEditChange}
                    placeholder="New Mobile Number"
                  />
                  <Button variant="primary" onClick={handleSavePhoneNumber}>Save Phone Number</Button>
                </>
              ) : (
                <Button variant="link" style={{ marginLeft: "55px" }} onClick={handleEditPhoneNumber}>Edit Phone Number</Button>
              )}
              <p style={{ marginLeft: "75px" }}>Registered on: {data.registrationDate?.slice(0, 10)}</p>
            </div>

           
          </Card>
        </div>
      </div>
    </>
  );
}

export default Profile;
