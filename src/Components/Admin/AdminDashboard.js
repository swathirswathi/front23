import AdminNavbar from "./AdminNavbar";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link, useLocation} from "react-router-dom";
import axios from "axios";

function AdminDash() {
  const location = useLocation();
  const token = location.state;
  const [userdata, setUserData] = useState([[]]);

  useEffect(() => {
    (async () => await GetBookings())();
  }, []);

  async function GetBookings() {
    try {
      const token1 = localStorage.getItem('token');
      const result = await axios.get(
        "http://localhost:5260/api/Reservation/admin/All",
        {
          headers: {
            Authorization: `Bearer ${token1}`,
          },
        }
      );

      setUserData(result.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch reservation data.");
    }
  }

  return (
    <>
      <AdminNavbar />
      <br /><br /><br /><br/><br /><br />
      <div className="container">
      <h2 style={{textAlign:"center"}}>Users</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
  {userdata ? userdata.map(function fn(Data, index) {
    return (
      <div key={index} className="card mx-4" style={{ width: "18rem" }}>
        <div className="card-body">
          <h5 className="card-title">UserID: {Data.user ? Data.user.userId : ""} </h5>
          <p className="card-text"><strong> First Name: </strong> {Data.user ? Data.user.firstName : ""}</p>
          <p className="card-text"><strong>Last Name: </strong> {Data.user ? Data.user.lastName : ""}</p>
          <p className="card-text"><strong>Username: </strong>{Data.user ? Data.user.username : ""}</p>
          <p className="card-text"><strong>Email: </strong> {Data.user ? Data.user.email : ""}</p>
          <p className="card-text"><strong>Phone: </strong>{Data.user ? Data.user.phoneNumber : ""}</p>
          <p className="card-text"><strong>Bookings:</strong>
            <Link to={{ pathname: "/userbookings" }} state={Data}>
              <a href="#">Details</a>
            </Link>
          </p>
        </div>
      </div>
    );
  }) : ""}
</div>
</div>
    </>
  );
}

export default AdminDash;
