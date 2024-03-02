import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import img from "../../Images/car-logo.jpg";
import profile from "../../Images/profile-logo.png";
import { useLocation,useNavigate } from "react-router-dom";
import "../../Components/MainNav/mainNav";
import { toast,ToastContainer } from "react-toastify";
import Sidebar from "./Sidebar";

function NavScrollExample(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const tok = location.state;

  const pass = () => {
    navigate("/profile", {
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
        <Navbar.Brand href="/dashboard">
          <img className="img" src={img} alt="img" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            
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

export default NavScrollExample;
