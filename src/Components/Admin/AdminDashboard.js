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
      <h2 style={{textAlign:"center"}}>Users</h2>
      <Table
        striped
        bordered
        hover
        style={{
          position: "relative",
          marginLeft:"22px",
          width: "80vw",
          height:"90vh"
        }}
      >
        
        <thead>
          <tr>
            <th>UserID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Bookings</th>
          </tr>
        </thead>

        {userdata
          ? userdata.map(function fn(Data) {
              return (
                <tbody>
                  <tr>
                    <td>{Data.user ? Data.user.userId : ""}</td>
                    <td>{Data.user ? Data.user.firstName : ""}</td>
                    <td>{Data.user ? Data.user.lastName : ""}</td>
                    <td>{Data.user ? Data.user.username : ""}</td>
                    <td>{Data.user ? Data.user.email : ""}</td>
                    <td>{Data.user ? Data.user.phoneNumber : ""}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/userbookings",
                        }}
                        state={Data}
                      >
                        <a href="#">Details</a>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              );
            })
          : ""}
      </Table>
    </>
  );
}

export default AdminDash;
