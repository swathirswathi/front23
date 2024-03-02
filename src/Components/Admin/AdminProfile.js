import NavScrollExample from "../../Components/MainNav/mainNav";
import "./Admin.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import img from "../../Images/profile-logo.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function AdminProfile(props) {
  const [data, setcarData] = useState([]);
  const [editedData, setEditedData] = useState({});
  const location = useLocation();
  const toke = location.state;

  const [selectedDiv, setSelectedDiv] = useState(null);
  const [showEditEmail, setShowEditEmail] = useState(false);
  const [showEditPhoneNumber, setShowEditPhoneNumber] = useState(false);

  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  useEffect(() => {
    (async () => await getUserDetails())();
  }, []);

  async function getUserDetails() {
    try {
      const token1 = localStorage.getItem('token');
      const result = await axios.get(
        "http://localhost:5260/api/Admin/admin/admins/get/" + toke.username,
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );
      setcarData(result.data);
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
      const { adminId: tokenAdminId, token } = toke; // Rename adminId to tokenAdminId
      const { email } = editedData;
      const adminId = data.adminId ? data.adminId : tokenAdminId; // Use tokenAdminId here
      const token1 = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5260/api/Admin/${data.adminId?data.adminId:toke.adminId}/update-email`,
        { adminId, email },
        {
          headers: {
            Authorization: `Bearer ${token1}`,
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
      const { adminId: tokenAdminId, token } = toke;
      const { phoneNumber } = editedData;
      const adminId = data.adminId ? data.adminId : tokenAdminId;
      const token1 = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5260/api/Admin/${data.adminId?data.adminId:toke.adminId}/update-phone-number`,
        { adminId, phoneNumber},
        {
          headers: {
            Authorization: `Bearer ${token1}`,
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
                <b>{data.firstName ? data.firstName : toke.name}</b>
              </div>
              <div style={{ opacity: "0.8" }}>{data.email ? data.email : toke.email}</div>
            </Card.Header>
            <div
              style={{ textAlign: "start", cursor: "pointer" }}
              className={selectedDiv === 0 ? "box red" : "box"}
              onClick={() => changeColor(0)}
            >
              <p style={{ marginLeft: "20px", marginTop: "10px" }}>Account</p>
            </div>
          </Card>
        </div>
        <div>
          <Card style={{ width: "70vw", height: "70vh", top: "100px" }}>
            <Card.Header style={{ borderBottom: "none", backgroundColor: "white", fontSize: "Large", fontWeight: "500" }}>
              Account
            </Card.Header>
            <div style={{ marginTop: "50px", textAlign: "left", marginLeft: "30px", fontSize: "large", fontWeight: "500" }}>Account Details</div>
            <hr style={{ marginLeft: "20px", marginRight: "20px", position: "relative", bottom: "15px" }} />
            <div style={{ textAlign: "left", position: "relative", bottom: "10px" }}>
              <p style={{ marginLeft: "40px" }}>First Name : {data.firstName ? data.firstName : toke.name}</p>
              <p style={{ marginLeft: "40px" }}>Last Name : {data.lastName ? data.lastName : "None"}</p>
              <p style={{ marginLeft: "40px" }}>Username : {data.username ? data.username : toke.email}</p>
            </div>
            <div style={{ position: "relative", textAlign: "center", bottom: "130px" }}>
              <p style={{marginLeft:"95px"}}>Email : {data.email ? data.email : toke.email}</p>
              {showEditEmail ? (
                <>
                  <input
                    type="text"
                    name="email"
                    value={editedData.email || ""}
                    onChange={handleEditChange}
                    placeholder="New Email"
                  />
                  <Button variant="primary" onClick={handleSaveEmail}>Save Email</Button>
                </>
              ) : (
                <Button style={{marginLeft:"55px"}} variant="link" onClick={handleEditEmail}>Edit Email</Button>
              )}
              <p style={{marginLeft:"55px"}}>Mobile : {data.phoneNumber ? data.phoneNumber : "None"}</p>
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
                <Button variant="link" style={{marginLeft:"55px"}} onClick={handleEditPhoneNumber}>Edit Phone Number</Button>
              )}
            </div>

            <Link to="/" style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" style={{ ml: "5px" }}> Logout </Button>
            </Link>

          </Card>
        </div>
      </div>
    </>
  );
}
export default AdminProfile;
