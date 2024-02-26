import NavScrollExample from "../../Components/MainNav/mainNav";
import "./Admin.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import img from "../../Images/profile-logo.png";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function AdminProfile(props) {
  const [data, setcarData] = useState([]);
  const location = useLocation();
  const toke = location.state;

  const [selectedDiv, setSelectedDiv] = useState(null);

  const changeColor = (index) => {
    setSelectedDiv(index);
  };

  useEffect(() => {
    (async () => await GetUserDetails())();
  }, []);

  async function GetUserDetails() {
    try {
      const result = await axios.get(
        "http://localhost:5260/api/Admin/admin/admins/get/" + toke.username,
        {
          headers: {
            Authorization: `Bearer ${toke.token}`,
          },
        }
      );
      setcarData(result.data);
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <>
      <NavScrollExample />
      <div className="profile-cont">
        <div className="profile-sidebar">
          <Card style={{position:"relative", width: "29rem", height: "38rem",top:"100px" }}>
            <Card.Header style={{ backgroundColor: "white", height:"200px"}}>
              <div>
                <img style={{ height: "120px",marginTop: "10px" }} src={img} alt="img" />
              </div>
              <div style={{marginTop:"5px"}}>
                <b>{data.firstName?data.firstName:toke.name}</b>
              </div>
              <div style={{opacity:"0.8"}}>{data.email?data.email:toke.email}</div>
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
        <div className="profile-mainbar">
          <Card style={{ width: "60rem", height: "38rem",top:"100px" }}>
            <Card.Header style={{ borderBottom: "none", backgroundColor: "white", fontSize: "Large",fontWeight:"500" }}>
              Account
            </Card.Header>
            <div style={{ marginTop: "50px", textAlign: "left", marginLeft: "30px", fontSize: "large",fontWeight:"500"}}>Account Details</div>
            <hr style={{ marginLeft: "20px", marginRight: "20px", position: "relative", bottom: "15px" }} />
            <div style={{ textAlign: "left", position: "relative", bottom: "10px" }}>
              <p style={{ marginLeft: "40px" }}>First Name : {data.firstName?data.firstName:toke.name}</p>
              <p style={{ marginLeft: "40px" }}>Last Name : {data.lastName?data.lastName:"None"}</p>
              <p style={{ marginLeft: "40px" }}>Username : {data.username?data.username:toke.email}</p>
            </div>
            <div style={{ position: "relative", textAlign: "center", bottom: "130px" }}>
              <p >Email : {data.email?data.email:toke.email}</p>
              <p style={{marginRight:"25px"}}>Mobile : {data.phoneNumber?data.phoneNumber:"None"}</p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
export default AdminProfile;
