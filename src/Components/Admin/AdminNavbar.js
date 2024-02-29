import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from "../../Images/car-logo.jpg";
import profile from "../../Images/profile-logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./Admin.css";
import { toast, ToastContainer } from "react-toastify";
import Sidebar from "../../Components/Cars/Sidebar";
import { useState } from "react";

function AdminNavbar(props) {
  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const tok = location.state;

  const pass = () => {
    navigate("/AdminProfile", {
      state: {
        token: tok.token,
        username: tok.username ? tok.username : null,
        email: tok.email ? tok.email : null,
        pic: tok.picture ? tok.picture : null,
        name: tok.name ? tok.name : null,
      },
    });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid className="navcolor">
        <Sidebar />
        <ToastContainer />
        <Navbar.Brand href="/">
          <img className="img" src={img} alt="img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >

            <Nav.Link style={{color: "black",fontFamily:"-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",}}
              href="/adminDetails"
            >
              Admin
            </Nav.Link>

            <Nav.Link
              style={{color: "black",fontFamily:"-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",}}
              href="/carDetailsPage"
            >
              Car
            </Nav.Link>

            <Nav.Link
              style={{color: "black",fontFamily:"-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",}}
              href="/userDetails"
            >
              User
            </Nav.Link>
           
            <Nav.Link
              style={{color: "black",fontFamily:"-apple-system,Helvetica Neue, Arial, sans-serif,Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol",}}
              href="/reservationDetails"
            >
              Reservation
            </Nav.Link>

          </Nav>

          <Navbar.Brand>
            <img
              style={{ cursor: "pointer" }}
              className="propic"
              onClick={pass}
              src={profile}
              alt="img"
            />
          </Navbar.Brand>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
