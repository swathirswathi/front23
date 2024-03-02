import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import img from "../../Images/car-logo.jpg";
import profile from "../../Images/profile-logo.png";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav"; 
import "./Admin.css";
import { ToastContainer } from "react-toastify";
import Sidebar from "../../Components/Cars/Sidebar";
import { useState } from "react";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const tok = location.state;

  const pass = () => {
    navigate("/AdminProfile", {
      state: {
        token: tok.token,
        adminId: tok.adminId ? tok.adminId : null,
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
        <Navbar.Brand as={Link} to="/">
          <img className="img" src={img} alt="img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>

            <Link to="/adminDetails" className="nav-link">Admin</Link>

            <Link to="/carDetailsPage" className="nav-link">Car</Link>

            <Link to="/userDetails" className="nav-link">User</Link>

            <Link to="/reservationDetails" className="nav-link">Reservation</Link>

            <Link to="/paymentDetails" className="nav-link">Payment</Link>

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
